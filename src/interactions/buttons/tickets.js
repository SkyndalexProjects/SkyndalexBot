const { MessageEmbed, Modal, MessageActionRow, MessageButton, MessageSelectMenu, TextInputComponent} = require("discord.js")
exports.run = async (client, interaction) => {
    console.log(`${pc.yellow('[MODULES]')} ${pc.green(`Used module: ${pc.red(`buttons (Ticket system)`)}`)}`);

    let table = await r.table("settings").get(interaction.guild.id).run(client.con);
    let ticketCategories = await r.table("tickets").get(interaction.guild.id).run(client.con); // TODO: fix error

    switch (interaction.customId) {
        case "move_complaint_confirm_2":
            let archiveComplaintsRow2 = new MessageActionRow()
                .addComponents(
                    new MessageButton()
                        .setCustomId("open_again_complaints")
                        .setLabel("Open again")
                        .setStyle("SUCCESS")
                );

            let setParentArchiveComplaint = await interaction.channel.setParent(ticketCategories.archiveChannel);
            let moved1 =  await interaction.channel.setName(`archived-${interaction.user.tag}`);

            let embedMovedComplaints = new MessageEmbed()
                .setTitle(`Successfully moved!`)
                .setDescription(`Channel <#${interaction.channel.id}> is in archive.`)
                .setColor("GREEN")
            await interaction.reply({embeds: [embedMovedComplaints], components: [archiveComplaintsRow2]})
            break;
        case "open_again_complaints":
            const complaintsMoved = await interaction.channel.setParent(ticketCategories.complaintTicketChannel)
            if (complaintsMoved) await interaction.channel.setName(`complaint-${interaction.user.tag}`)

            let embedMovedAgainComplaint = new MessageEmbed()
                .setDescription("Successfully opened again!")
                .setColor("GREEN")
            await interaction.reply({ embeds: [embedMovedAgainComplaint] })
            break;
    }
}