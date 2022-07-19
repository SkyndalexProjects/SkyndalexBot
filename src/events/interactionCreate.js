const { MessageEmbed } = require('discord.js');
const fs = require("fs");
module.exports = async (client, interaction) => {
    console.log(pc.yellow(`[INTERACTION USED] ${pc.green(interaction.user.tag)}`));
    // client.channels.cache.get("998635347439271976").send(`\`\`\`👤 User: ${interaction.user.tag}\n✈️ Interaction name: ${interaction.commandName || "No command was used"}\n📕 ID: ${interaction.user.id}\n📙 Guild ID: ${interaction.guild.id}\`\`\``);

    const interactionFiles = fs.readdirSync('./interactions');

    for (const folder of interactionFiles) {
        const interactionFiles = fs.readdirSync(`./interactions/${folder}`).filter((file) => file.endsWith('.js'));
        for (const file of interactionFiles) {
            const module = require(`../interactions/${folder}/${file}`);
            module.run(client, interaction)
        }
    }

    await require("../../src/utils/run")(client, interaction);

    if (!interaction.isCommand()) return;

    const slashCommand = client.slashCommands.get(interaction.commandName);
    if (!slashCommand) return;
    if (!interaction.user.bot)
        await slashCommand.execute(client, interaction);
};