module.exports = async (client) => {
require("../datadog/collectStats").run(client);
require("../routers/app.js").run(client);

    client.user.setPresence({
        activities: [{name: '[⚠️] Global commands are disabled!\nBot testing available only on support: https://discord.gg/RkUYDx5bhM'}],
    });

    console.log(pc.green(`${pc.yellow('[DISCORD CLIENT]')} Ready`));

};
