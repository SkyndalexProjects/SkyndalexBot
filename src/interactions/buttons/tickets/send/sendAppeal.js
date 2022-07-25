const {Modal, TextInputComponent, MessageActionRow, MessageSelectMenu, MessageEmbed} = require("discord.js");
module.exports = async (client, interaction) => {
    let table = await r.table("settings").get(interaction.guild.id).run(client.con);
    let ticketCategories = await r.table("tickets").get(interaction.guild.id).run(client.con);

    if (interaction.customId === "send_appeal") {
        const ticketAppealModal = new Modal()
            .setTitle("Send appeal")
            .setCustomId(`ticketModal`)

        const appealDescription = new TextInputComponent()
            .setStyle("PARAGRAPH")
            .setRequired(true)
            .setPlaceholder("Appeal")
            .setMaxLength(100) // test
            .setCustomId("describe_appeal")
            .setLabel("Appeal description")

        const firstActionRow = new MessageActionRow().addComponents(appealDescription)

        ticketAppealModal.addComponents(firstActionRow)
        await interaction.showModal(ticketAppealModal)

        let ticketAppealChannelPermissions = await interaction.guild.channels.create(`appeal-${interaction.user.tag}`, {
            parent: ticketCategories.appealChannel,
            type: "GUILD_TEXT",
            permissionOverwrites: [
                { id: table.moderatorRole, allow: ["VIEW_CHANNEL", "SEND_MESSAGES"] },
                { id: table.userRole, deny: ["VIEW_CHANNEL"] },
                { id: interaction.guild.id, deny: ["VIEW_CHANNEL"] },
            ],
        });

        const filter = (interaction) => interaction.customId === `ticketModal`;
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

            let embedSuggestion = new MessageEmbed()
                .setTitle("New appeal!")
                .setDescription(`You can add more users to ticket with command /ticket add`)
                .addField(`Appeal`, String(interaction.fields.getTextInputValue("describe_appeal") || "None"))
                .setColor("GREEN")
            await ticketAppealChannelPermissions.send({embeds: [embedSuggestion], components: [ticketActions] })

            let embedImportantSuggestion = new MessageEmbed()
                .setDescription(`**DANGER:** User is not in channel! You must first verify that his data is worthy of consideration.\nConfirm with the command: \`/ticket add ${interaction.user.id}\``)
                .setFooter({ text: `By: ${interaction.user.tag}` })
                .setColor("RED")
            await ticketAppealChannelPermissions.send({embeds: [embedImportantSuggestion]})

            await interaction.reply("Successfully sent.")
        }).catch(() => null);
    }
}