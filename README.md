# Fantasy Critic Helper Bot
A bot to help with posting when public bids have started for Fantasy Critic

Create a `./src/config.json` file with the following template for your bot:
```
{
    "token": "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    "clientId": "XXXXXXXXXXXXXX"
}
```

Install with `npm install`
Call `npm run start` to run the bot, or `npm run dev` for development refreshing support 

Commands:
- use the `/listen LEAGUE_ID` command to listen to a certain league in a channel
- use `/stop all` to stop listening to all leagues in a channel
- use `/stop league LEAGUE_ID` to stop listening to a certain league in a channel

Notes:
If anyone comes across this, hi :wave:.

I made this pretty quickly, so stuff isn't really documented well, feel free to make improvements :shrug:
