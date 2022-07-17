const {MessageEmbed} = require("discord.js");
module.exports = async (client, interaction) => {
    if (interaction.customId === "disable_appeal") {
        let table = await r.table("settings").get(interaction.guild.id).run(client.con);

        await r.table("tickets").insert({ id: interaction.guild.id,  appealEnabled: false }, { conflict: "update" }).run(client.con)

        let embedDisableButtonsappealsSuccess = new MessageEmbed()
            .setTitle("Disable appeals")
            .setDescription("\`\`\`diff\n- [❌] Successfully disabled\`\`\`")
            .setColor("RED")
        await interaction.reply({embeds: [embedDisableButtonsappealsSuccess]})
    }
}