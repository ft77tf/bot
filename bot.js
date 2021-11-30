const keepAlive = require("./server.js");
(async () => {
    //469 s4d preview
    let process = require('process');
    process.on('uncaughtException', function(err) {
        console.log(err);
    });
    let Discord = require("discord.js")
    let Database = require("easy-json-database")
    let {
        MessageEmbed,
        MessageButton,
        MessageActionRow,
        Intents,
        Permissions,
        MessageSelectMenu
    } = require("discord.js")
    let logs = require("discord-logs")
    let {
        Player,
        RepeatMode
    } = require("discord-music-player");
    const lyricsFinder = require('lyrics-finder');
    require('events').EventEmitter.defaultMaxListeners = 50;
    let fs = require('fs');
    const devMode = typeof __E_IS_DEV !== "undefined" && __E_IS_DEV;
    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    const s4d = {
        Discord,
        database: new Database(`${devMode ? S4D_NATIVE_GET_PATH : "."}/database.json`),
        fire: null,
        joiningMember: null,
        reply: null,
        tokenInvalid: false,
        tokenError: null,
        player: null,
        manager: null,
        Inviter: null,
        message: null,
        notifer: null,
        checkMessageExists() {
            if (!s4d.client) throw new Error('You cannot perform message operations without a Discord.js client')
            if (!s4d.client.readyTimestamp) throw new Error('You cannot perform message operations while the bot is not connected to the Discord API')
        }
    };
    s4d.client = new s4d.Discord.Client({
        intents: [Object.values(s4d.Discord.Intents.FLAGS).reduce((acc, p) => acc | p, 0)],
        partials: ["REACTION"]
    });
    logs(s4d.client);
    const player = new Player(s4d.client, {
        leaveOnEmpty: false,
    });
    s4d.client.player = player;
    await s4d.client.login('Your bot token').catch((e) => {
        s4d.tokenInvalid = true;
        s4d.tokenError = e;
    });
    keepAlive()
    return s4d
})();
