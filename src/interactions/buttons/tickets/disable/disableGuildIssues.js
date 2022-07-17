const {MessageEmbed} = require("discord.js");
module.exports = async (client, interaction) => {
    if (interaction.customId === "disable_gissues") {
        let table = await r.table("settings").get(interaction.guild.id).run(client.con)

        await r.table("tickets").insert({ id: interaction.guild.id, guildissueEnabled: false }, { conflict: "update" }).run(client.con)

        let embedDisableButtonsguildIssuesSuccess = new MessageEmbed()
            .setTitle("Disable guild issues")
            .setDescription("\`\`\`diff\n- [❌] Successfully disabled\`\`\`")
            .setColor("RED")
        await interaction.reply({ embeds: [embedDisableButtonsguildIssuesSuccess] })
    }
}