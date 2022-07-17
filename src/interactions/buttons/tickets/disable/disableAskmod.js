const {MessageEmbed} = require("discord.js");
module.exports = async (client, interaction) => {
    if (interaction.customId === "disable_askmod") {
        await r.table("tickets").insert({ id: interaction.guild.id, askmodEnabled: false }, { conflict: "update" }).run(client.con)

        let embedDisableButtonsaskmodsSuccess = new MessageEmbed()
            .setTitle("Disable asking mods")
            .setDescription("\`\`\`diff\n- [❌] Successfully disabled\`\`\`")
            .setColor("RED")
        await interaction.reply({ embeds: [embedDisableButtonsaskmodsSuccess] })
    }
}