//@ts-check
import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v9';
import { clientId, token } from './config.json';
import { SlashCommandBuilder } from '@discordjs/builders';
import storage from 'node-persist';
import { BaseCommandInteraction, CacheType, Client, Intents, Interaction, MessageEmbed, TextChannel } from 'discord.js';
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });
import { union } from 'lodash';
import { FantasyCriticResponse, getLeague } from './fantasyCritic';

const STORAGE_WATCH_KEY = "watches";
const POLL_TIME = 1000 * 60 * 10;// 30 minutes
//#region Setup stoage

const setupStorage = async () => {
  try {
    await storage.init({
      dir: 'storage',
      stringify: JSON.stringify,
      parse: JSON.parse,
      encoding: 'utf8',
    });
  } catch (e) {
    console.log(e);
  }
}

//#endregion

//#region Setup Commands

const setupRest = async (guilds: string[]) => {
  const commands = [
    new SlashCommandBuilder().setName('listen').setDescription('Will listen to public bids and post them in this channel').addStringOption(option => option.setName('league').setDescription('The league to listen to')),
    new SlashCommandBuilder().setName('stop').setDescription('Will stop listening to public bids and post them in this channel')

      .addSubcommand(subcommand =>
        subcommand
          .setName('league')
          .setDescription('Stop listening to a particular league')
          .addStringOption(option => option.setName('league').setDescription('The league ID to stop listening to')))

      .addSubcommand(subcommand =>
        subcommand
          .setName('all')
          .setDescription('Stop listening to all leagues'))
  ].map(command => command.toJSON());

  const rest = new REST({ version: '9' }).setToken(token);

  (async () => {
    try {
      console.log('Started refreshing application (/) commands.');

      for (const guildId of guilds) {
        console.log("Updating commands for: " + guildId);
        try {
          await rest.put(
            Routes.applicationGuildCommands(clientId, guildId),
            { body: commands },
          );
        } catch {
          console.log("Don't have permissions for this server");
        }
      }

      console.log('Successfully reloaded application (/) commands.');
    }
    catch (error) {
      console.error(error);
    }
  })();
}

//#endregion

//#region Response

const listenInteraction = async (interaction: BaseCommandInteraction<CacheType>) => {
  try {
    await interaction.deferReply();
    const league = interaction.options.get("league");
    if (league == null || league.value == null) {
      await interaction.editReply('Need league ID');
      return;
    }

    let leagueId = league.value.toString();
    if (leagueId.length != 36) {
      await interaction.editReply('League ID needs to be 32 Chars (GUID)');
      return;
    }

    // test the league
    let data = await getLeague(leagueId);
    if (data == null) {
      await interaction.editReply('League ID is invalid');
      return;
    }

    var watches = await storage.get(STORAGE_WATCH_KEY) as WatchEntries;
    if (watches == null)
      watches = new WatchEntries();

    let watch = watches.entries.find(x => x.channelId == interaction.channelId && x.guildId == interaction.guildId);
    if (watch == null) {
      watch = new WatchEntry({ channelId: interaction.channelId, guildId: interaction.guildId! });
      watches.entries.push(watch);
    }

    if (watch.leagues.findIndex(x => x.leagueId == leagueId) >= 0) {
      await interaction.editReply(`League \`${leagueId}\` is already being watched`);
      return;
    }

    watch.leagues.push(new LeagueEntry(leagueId));
    await storage.set(STORAGE_WATCH_KEY, watches);
    await interaction.editReply(`Listening to league \`${leagueId}\``);
  }
  catch (e) {
    console.log(e);
  }
}


/**
 * 
 * @param {Interaction<CacheType>} interaction 
 */
const stopInteraction = async (interaction: BaseCommandInteraction<CacheType>) => {
  const league = interaction.options.get("league");
  let leagueIdToRemove = null as string | null;
  await interaction.deferReply();

  if (league != null && league.value != null) {
    leagueIdToRemove = league.value.toString();

    if (leagueIdToRemove.length != 36) {
      await interaction.editReply('League ID needs to be 32 Chars (GUID)');
      return;
    }
  }

  var watches = await storage.get(STORAGE_WATCH_KEY) as WatchEntries;
  if (watches == null)
    watches = new WatchEntries();

  let watchIndex = watches.entries.findIndex(x => x.channelId == interaction.channelId && x.guildId == interaction.guildId);
  if (watchIndex < 0) {
    await interaction.editReply('This channel is already not listening to leagues');
    return;
  }

  let watch = watches.entries[watchIndex];
  // remove one league
  if (leagueIdToRemove != null) {
    let leagueIndex = watch.leagues.findIndex(x => x.leagueId == leagueIdToRemove);
    if (leagueIndex < 0) {
      await interaction.editReply(`League \`${leagueIdToRemove}\` is already not being listened to`);
      return;
    }

    watch.leagues.splice(leagueIndex, 1);
    await interaction.editReply(`Stopped listening to League \`${leagueIdToRemove}\``);
  }
  // remove all leagues, i.e. the entire entry
  else {
    watches.entries.splice(watchIndex, 1);
    await interaction.editReply(`Stopped listening to all leagues`);
  }
  await storage.set(STORAGE_WATCH_KEY, watches);
}

client.on('ready', () => {
  console.log(`Logged in as ${client!.user!.tag}!`);
  const existingGuilds = client.guilds.cache.map(guild => guild.id);
  setupRest(existingGuilds);
});

client.on('interactionCreate', async interaction => {
  try {
    if (!interaction.isCommand()) return;

    if (interaction.commandName === 'listen')
      await listenInteraction(interaction);
    else if (interaction.commandName === 'stop') {
      await stopInteraction(interaction);
    }
  } catch (e) {
    console.log(e);
  }
});

client.on("guildCreate", guild => {
  setupRest([guild.id]);
});

//#endregion

//#region listen
var startListening = async () => {
  const tickTimer = async () => {
    await new Promise(r => setTimeout(r, POLL_TIME));
    await tick();
  }
  const tick = async () => {
    // call tick again in the future
    tickTimer();

    var watches = await storage.get(STORAGE_WATCH_KEY) as WatchEntries;
    if (watches == null)
      return;

    var leagueCache = {} as { [id: string]: FantasyCriticResponse; };

    for (const watch of watches.entries) {
      for (const league of watch.leagues) {
        try {
          let response = leagueCache[league.leagueId] as FantasyCriticResponse | null;

          // get the response
          if (response == null) {
            response = await getLeague(league.leagueId);
            // if we can't fetch, then stop
            if (response == null)
              continue;

            leagueCache[league.leagueId] = response;
          }

          // are there no public bids?
          if (response.publicBiddingGames == null) {
            // Did we have public bids before? if so store the cache as empty
            if (league.publicBiddingGamesMasterIds.length !== 0) {
              console.log("Day has come to an end, no public bids");
              league.publicBiddingGamesMasterIds = [];
            } else {
              continue;
            }
          } else {
            // see if there are master bids
            var masterIds = response.publicBiddingGames.map(x => x.masterGame.masterGameID);
            var combinedIds = union(masterIds, league.publicBiddingGamesMasterIds);

            if (league.publicBiddingGamesMasterIds.length == combinedIds.length) {
              // no noticable changes, do nothing
              continue;
            }

            if (masterIds.length !== 0) {
              // there are new bids, post them in the chat
              var channel = (await client.channels.fetch(watch.channelId!)) as TextChannel;
              var message = createEmbedMessage(response);
              await channel.send({ embeds: [message] });
            }

            league.publicBiddingGamesMasterIds = masterIds;
          }

          await storage.set(STORAGE_WATCH_KEY, watches);
        } catch (e) {
          console.log(e);
        }
      }
    }
  }

  await tick();
}

const createEmbedMessage = (data: FantasyCriticResponse) => {
  let message = new MessageEmbed();

  let bids = data.publicBiddingGames;
  bids.sort((x, y) => x.masterGame.gameName.localeCompare(y.masterGame.gameName))

  let games = bids.map(x => {
    let result = x.masterGame.gameName;

    if (x.counterPick)
      result += " (CP)"

    return result;
  }).reduce((x, y) => `${x}\n${y}`)
  let dates = bids.map(x => x.masterGame.estimatedReleaseDate).reduce((x, y) => `${x}\n${y}`)

  message
    .setTitle(`Fantasy Critic Public Bids - ${data.players[0].user.leagueName}`)
    .setColor("#d6993a")
    .setURL(`https://www.fantasycritic.games/league/${data.leagueID}/${data.year}`)
    .addFields(
      { name: 'Games', value: games, inline: true },
      { name: 'Dates', value: dates || "N/A", inline: true },
    )
    .setThumbnail("https://pbs.twimg.com/profile_images/1067596827279704064/rFjTL7o6_400x400.jpg")
    .setTimestamp();

  return message;
}

//#endregion

//#region Initialize
console.log("Starting Storage");
setupStorage().then(() => {
  console.log("Started Storage");
  console.log("Logging into Discord");
  client.login(token).then(() => {
    console.log("Logged into Discord");
    console.log("Start listening for updates");
    startListening();
  });
});
//#endregion


class WatchEntries {
  entries: WatchEntry[] = [];
}

class WatchEntry {
  guildId: string;
  channelId: string;
  leagues: LeagueEntry[] = [];

  constructor(args: { guildId: string, channelId: string }) {
    this.guildId = args.guildId;
    this.channelId = args.channelId;
  }
}

class LeagueEntry {
  leagueId: string;
  publicBiddingGamesMasterIds: string[] = [];

  constructor(leagueId: string) {
    this.leagueId = leagueId;
  }
}
