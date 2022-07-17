const {MessageActionRow, MessageButton, MessageEmbed} = require("discord.js");
module.exports = async (client, interaction) => {
    if (interaction.customId === "archive_complaint") {
        let table = await r.table("settings").get(interaction.guild.id).run(client.con);
        let ticketCategories = await r.table("tickets").get(interaction.guild.id).run(client.con);

        let archiveComplaintRow = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setCustomId("move_complaint_confirm_2")
                    .setLabel("move it")
                    .setStyle("DANGER")
            )
        let embedConfirmMoveComplaintToArchive = new MessageEmbed()
            .setTitle(`Are you sure?`)
            .setDescription(`Do you really want to ~~lose all your messages?~~ No, seriously, move the channel to the category <#${ticketCategories.archiveChannel}>?`)
            .setColor("ORANGE")
        await interaction.reply({embeds: [embedConfirmMoveComplaintToArchive], components: [archiveComplaintRow]})
    }
}