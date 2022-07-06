const { MessageEmbed } = require('discord.js');
const fs = require("fs");
module.exports = async (client, interaction) => {
    console.log(pc.yellow(`[INTERACTION USED] ${pc.green(interaction.user.tag)}`));
    const interactionFiles = fs.readdirSync('./interactions');

    for (const folder of interactionFiles) {
        const interactionFiles = fs.readdirSync(`./interactions/${folder}`).filter((file) => file.endsWith('.js'));
        for (const file of interactionFiles) {
            const module = require(`../interactions/${folder}/${file}`);
            module.run(client, interaction)
        }
    }

    // kiedyś zrobię handler xD

    await require("../../src/interactions/select menus/settings/broadcast-channel.js")(client, interaction)
    await require("../../src/interactions/select menus/settings/complaints-channel.js")(client, interaction)
    await require("../../src/interactions/select menus/settings/goodbye-channel.js")(client, interaction)
    await require("../../src/interactions/select menus/settings/images-channel.js")(client, interaction)
    await require("../../src/interactions/select menus/settings/modlog-channel.js")(client, interaction)
    await require("../../src/interactions/select menus/settings/suggestions-channel.js")(client, interaction)
    await require("../../src/interactions/select menus/settings/welcome-channel.js")(client, interaction)

    if (!interaction.isCommand()) return;

    const slashCommand = client.slashCommands.get(interaction.commandName);
    if (!slashCommand) return;
    if (!interaction.user.bot)
        await slashCommand.execute(client, interaction);
};
 // matstef ma
