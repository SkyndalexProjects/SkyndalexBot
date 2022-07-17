const { MessageEmbed } = require("discord.js");
module.exports = async (client, interaction) => {
    if (interaction.customId === "disable_suggestions") {
        await r.table("tickets").insert({ id: interaction.guild.id, suggestionsEnabled: false }, { conflict: "update" }).run(client.con)

        let embedDisableButtonsSuggestionsSuccess = new MessageEmbed()
            .setTitle("Disable suggestions")
            .setDescription("\`\`\`diff\n- [❌] Successfully disabled\`\`\`")
            .setColor("RED")
        await interaction.reply({ embeds: [embedDisableButtonsSuggestionsSuccess] })
    }
}