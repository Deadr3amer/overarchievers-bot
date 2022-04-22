const { Client, Collection, Intents } = require('discord.js');

const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MEMBERS,
    ],
});
module.exports = client;

// Global Vars
client.commands = new Collection();
client.slashCommands = new Collection();
client.config = require("./config.json");
const chalk = require('chalk');

const log = console.log;

client.startingLogger = function(message) {
    return log(chalk.yellowBright('[START-LOG]') + ' ' + chalk.redBright(message));
};

// Initializing handlers
require("./handler")(client);

client.login(client.config.token).catch(e => console.log(e));
