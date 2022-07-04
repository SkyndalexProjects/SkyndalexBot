require("dotenv").config()
const { token } = require('./config.json').discord
const fs = require('fs');
const Base = require('./Base.js');
const { Collection, Options, Intents } = require('discord.js');
const r = require('rethinkdb');
const client = new Base({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MEMBERS ],
    partials: ['MESSAGE', 'CHANNEL', 'REACTION'],
    makeCache: Options.cacheWithLimits({
        MessageManager: 200,
        PresenceManager: 0,
        UserManager: 0,
    }),
});

client.slashCommands = new Collection();
client.commands = new Collection();

global.r = require('rethinkdb');
global.pc = require('picocolors');
global.hastebin = require("hastebin");

require("./datadog/collectStats").run(client);
require("./routers/app.js").run(client);

r.connect({ db: 'skyndalex', host: 'localhost', port: '28015', timeout: 600 },
    function (err, con) {
        if (err) console.log(err);
        client.con = con;

        console.log(pc.green(`${pc.yellow('[DATABASE]')} Connected`));
    }
);

const commandFolders = fs.readdirSync('./interactions/slashcommands');

for (const folder of commandFolders) {
    const commandFiles = fs.readdirSync(`./interactions/slashcommands/${folder}`).filter((file) => file.endsWith('.js'));
    for (const file of commandFiles) {
        const command = require(`./interactions/slashcommands/${folder}/${file}`);
        client.slashCommands.set(command.data.name, command);
    }
}


const eventFiles = fs.readdirSync('./events').filter((file) => file.endsWith('.js'));

for (file of eventFiles) {
    const event = require(`./events/${file}`);
    const eventName = file.split('.js')[0];
    client.on(eventName, (...args) => event(client, ...args));
}


console.log(pc.bold(pc.green(`${pc.yellow("[NOTIFICATION]")} Have there been errors? Use the ${pc.bgRed("node deploy.js")} command to check for errors in the console.`)))
client.login(token);
