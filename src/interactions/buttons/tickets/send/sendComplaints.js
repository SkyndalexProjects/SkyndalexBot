const { Modal, TextInputComponent, MessageActionRow, MessageEmbed, MessageButton, MessageSelectMenu } = require("discord.js");
module.exports = async (client, interaction) => {
    if (interaction.customId === "send_complaints") {
        let table = await r.table("settings").get(interaction.guild.id).run(client.con);
        let ticketCategories = await r.table("tickets").get(interaction.guild.id).run(client.con); // TODO: fix error

        const sendComplaintModal = new Modal()
            .setTitle("Send complaint ticket")
            .setCustomId(`ticketComplaint`)

        const complaintTicketDescription = new TextInputComponent()
            .setStyle("PARAGRAPH")
            .setRequired(true)
            .setPlaceholder("Description")
            .setMaxLength(100) // test
            .setCustomId("describe_complaint")
            .setLabel("Complaint description")

        const complaintTicketProofs = new TextInputComponent()
            .setStyle("SHORT")
            .setPlaceholder("Proofs")
            .setMaxLength(100)
            .setCustomId("proofs_complaint")
            .setLabel("Proofs")

        const firstActionRow = new MessageActionRow().addComponents(complaintTicketDescription)
        const secondActionRow = new MessageActionRow().addComponents(complaintTicketProofs)

        sendComplaintModal.addComponents(firstActionRow, secondActionRow)
        await interaction.showModal(sendComplaintModal)

        let ticketComplaintChannelPermissions = await interaction.guild.channels.create(`complaint-${interaction.user.tag}`, {
            parent: ticketCategories.complaintTicketChannel,
            type: "GUILD_TEXT",
            permissionOverwrites: [
                { id: table.moderatorRole, allow: ["VIEW_CHANNEL", "SEND_MESSAGES" ] },
                { id: table.userRole, deny: ["VIEW_CHANNEL"] },
                { id: interaction.guild.id, deny: ["VIEW_CHANNEL"] },
            ],
        });

        const filter = (interaction) => interaction.customId === `ticketComplaint`;
        await interaction.awaitModalSubmit({ filter, time: 15000 }).then(async interaction => {
            const ticketActions = new MessageActionRow()
                .addComponents(
                    new MessageSelectMenu()
                        .setCustomId("ticket_actions")
                        .setPlaceholder("Ticket actions")
                        .addOptions([
                            { label: `➕ Add to trello`, description: "Add this suggestion to trello ", value: `trello_addticket` },
                            { label: `🔒 Close `, description: "Close this ticket ", value: `ticket_close` },
                            { label: `❌  Delete`, description: "Delete ticket ", value: `ticket_delete` },
                        ])
                );

            const embedSending = new MessageEmbed()
                .setDescription("Sending...")
                .setColor("YELLOW")

            const embedSent = new MessageEmbed()
                .setDescription("Ticket successfully sent. You were not added to the ticket because the moderator has to do it manually [the administrator can enable automatic addition of users in the settings].")
                .setColor("BLURPLE")

            await interaction.reply({ embeds: [embedSending], ephemeral: true });





            let embedComplaint = new MessageEmbed()
                .setTitle("New complaint!")
                .setDescription(`You can add more users to ticket with command /ticket add`)
                .addField(`Description`, String(interaction.fields.getTextInputValue("describe_complaint") || "None"))
                .addField(`Proofs`, String(interaction.fields.getTextInputValue("proofs_complaint") || "None"))
                .setFooter({ text: "Too many components in this message! Clicking May Not Work the First Time\nYou cannot move complaints into the same complaints category."})
                .setColor("GREEN")
            await ticketComplaintChannelPermissions.send({ embeds: [embedComplaint], components: [ticketActions] }).then(m => m.pin())

            let embedImportant = new MessageEmbed()
                .setDescription(`**DANGER:** User is not in channel! You must first verify that his data is worthy of consideration.\nConfirm with the command: \`/ticket add ${interaction.user.id}\``)
                .setFooter({ text: `Ticket By: ${interaction.user.tag} [${interaction.user.id}]` })
                .setColor("RED")
            await ticketComplaintChannelPermissions.send({ embeds: [embedImportant]}).then(m => m.pin());

            await interaction.editReply({ embeds: [embedSent], ephemeral: true})
        }).catch(() => null)
    }
}