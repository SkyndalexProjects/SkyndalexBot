const {MessageEmbed} = require("discord.js");
module.exports = async (client, interaction) => {
    if (interaction.customId === "disable_complaints") {
        let table = await r.table("settings").get(interaction.guild.id).run(client.con);

        await r.table("tickets").insert({ id: interaction.guild.id, complaintsEnabled: false }, { conflict: "update" }).run(client.con)

        let embedDisableButtonsComplaintsSuccess = new MessageEmbed()
            .setTitle("Disable complaints")
            .setDescription("\`\`\`diff\n- [❌] Successfully disabled\`\`\`")
            .setColor("RED")
        await interaction.reply({ embeds: [embedDisableButtonsComplaintsSuccess] })
    }
}