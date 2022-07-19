const {Modal, MessageEmbed, TextInputComponent, MessageActionRow, MessageSelectMenu } = require("discord.js");
module.exports = async (client, interaction) => {
    let table = await r.table("settings").get(interaction.guild.id).run(client.con);
    let ticketCategories = await r.table("tickets").get(interaction.guild.id).run(client.con);

    if (interaction.customId === "send_suggestions") {
        const ticketSuggestionsModal = new Modal()
            .setTitle("Send suggestion")
            .setCustomId(`ticketSuggestion`)

        const suggestionDescription = new TextInputComponent()
            .setStyle("PARAGRAPH")
            .setRequired(true)
            .setPlaceholder("Description")
            .setMaxLength(100) // test
            .setCustomId("describe_suggestions")
            .setLabel("Suggestion")

        const suggestionProofs = new TextInputComponent()
            .setStyle("SHORT")
            .setPlaceholder("Image/Gif URL (etc. https://imgur.com/NQinKJB)")
            .setMaxLength(100)
            .setCustomId("files_suggestion")
            .setLabel("Files")

        const firstActionRow = new MessageActionRow().addComponents(suggestionDescription)
        const secondActionRow = new MessageActionRow().addComponents(suggestionProofs)

        ticketSuggestionsModal.addComponents(firstActionRow, secondActionRow)
        await interaction.showModal(ticketSuggestionsModal)

        let ticketSuggestionChannelPermissions = await interaction.guild.channels.create(`suggestion-${interaction.user.tag}`, {
            parent: ticketCategories.suggestionsChannel,
            type: "GUILD_TEXT",
            permissionOverwrites: [
                { id: table.moderatorRole, allow: ["VIEW_CHANNEL", "SEND_MESSAGES"] },
                { id: table.userRole, deny: ["VIEW_CHANNEL"] },
                { id: interaction.guild.id, deny: ["VIEW_CHANNEL"] },
            ],
        });

        const filter = (interaction) => interaction.customId === `ticketSuggestion`;
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
                            { label: `↔️ Move`, description: "Move ticket to another category ", value: `move_ticket` },
                        ])
                );

            let embedSuggestion = new MessageEmbed()
                .setTitle("New suggestion!")
                .setDescription(`You can add more users to ticket with command /ticket add`)
                .addField(`Suggestion`, String(interaction.fields.getTextInputValue("describe_suggestions") || "None"))
                .addField(`Images/Gifs`, String(interaction.fields.getTextInputValue("files_suggestion") || "None"))
                .setColor("GREEN")
            await ticketSuggestionChannelPermissions.send({embeds: [embedSuggestion], components: [ticketActions] })

            let embedImportantSuggestion = new MessageEmbed()
                .setDescription(`**DANGER:** User is not in channel! You must first verify that his data is worthy of consideration.\nConfirm with the command: \`/ticket add ${interaction.user.id}\``)
                .setFooter({ text: `By: ${interaction.user.tag}` })
                .setColor("RED")
            await ticketSuggestionChannelPermissions.send({embeds: [embedImportantSuggestion]})

            await interaction.reply("Successfully sent.")
        });
    }
}