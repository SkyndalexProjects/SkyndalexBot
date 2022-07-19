const { MessageEmbed } = require("discord.js");
module.exports = async (client, interaction) => {
    if (!interaction.isSelectMenu() || interaction.customId !== "move-ticket" || interaction.values[0] !== "suggestions") return;

    const db = await r.table("tickets").get(interaction.guild.id).run(client.con)

    await interaction.channel.setParent(db.suggestionsChannel)
    await interaction.channel.setName(`suggestion-${interaction.user.tag}`)

    await interaction.reply({ content: `Successfullly moved ticket to category: <#${db.suggestionsChannel}>`})
}