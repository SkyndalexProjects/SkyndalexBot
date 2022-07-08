const { MessageEmbed, Modal, MessageActionRow, MessageButton, MessageSelectMenu, TextInputComponent} = require("discord.js")
exports.run = async (client, interaction) => {
    console.log(`${pc.yellow('[MODULES]')} ${pc.green(`Used module: ${pc.red(`buttons (Ticket system)`)}`)}`);

    let table = await r.table("settings").get(interaction.guild.id).run(client.con);
    let ticketCategories = await r.table("tickets").get(interaction.guild.id).run(client.con); // TODO: fix error

    switch (interaction.customId) {
        case "enable_complaints":
            if (!table?.userRole) return interaction.reply({ content: `\`userRole\` not found in server settings! Please configure it with \`/set\` command.`,  ephemeral: true });
            let complaintChannel = await interaction.guild.channels.create("complaints", {
                type: "GUILD_CATEGORY",
                permissionOverwrites: [
                    { id: table.moderatorRole, allow: ["VIEW_CHANNEL", "SEND_MESSAGES"] },
                    { id: table.userRole, deny: ["VIEW_CHANNEL"] },
                    { id: interaction.guild.id, deny: ["VIEW_CHANNEL"] }
                ]
            })

            await r.table("tickets").insert({ id: interaction.guild.id, complaintsEnabled: true, complaintTicketChannel: complaintChannel.id }, { conflict: "update" }).run(client.con)

            let embedEnableButtonsComplaintsSuccess = new MessageEmbed()
                .setTitle("Enable complaints")
                .setDescription("\`\`\`diff\n+ [✅] Successfully enabled\`\`\`")
                .setColor("GREEN")
            await interaction.reply({ embeds: [embedEnableButtonsComplaintsSuccess] })
            break;
        case "enable_suggestions":
            if (!table?.userRole) return interaction.reply({ content: "\`userRole\` not found in server settings! Please configure it with \`/set\` command.",  ephemeral: true });

            let suggestionsChannel = await interaction.guild.channels.create("suggestions", {
                type: "GUILD_CATEGORY",
                permissionOverwrites: [
                    { id: table.moderatorRole, allow: ["VIEW_CHANNEL", "SEND_MESSAGES"] },
                    { id: table.userRole, deny: ["VIEW_CHANNEL"] },
                    { id: interaction.guild.id, deny: ["VIEW_CHANNEL"] }
                ]
            });

            await r.table("tickets").insert({ id: interaction.guild.id, suggestionsEnabled: true, suggestionsChannel: suggestionsChannel.id }, { conflict: "update" }).run(client.con)

            let embedEnableButtonsSuggestionsSuccess = new MessageEmbed()
                .setTitle("Enable suggestions")
                .setDescription("\`\`\`diff\n+ [✅] Successfully enabled\`\`\`")
                .setColor("GREEN")
            await interaction.reply({ embeds: [embedEnableButtonsSuggestionsSuccess] })
            break;
        case "enable_askmod":
            if (!table?.userRole) return interaction.reply({ content: "\`userRole\` not found in server settings! Please configure it with \`/set\` command.",  ephemeral: true });

            let askmodChannel = await interaction.guild.channels.create("Mod questions", {
                type: "GUILD_CATEGORY",
                permissionOverwrites: [
                    { id: table.moderatorRole, allow: ["VIEW_CHANNEL", "SEND_MESSAGES"] },
                    { id: table.userRole, deny: ["VIEW_CHANNEL"] },
                    { id: interaction.guild.id, deny: ["VIEW_CHANNEL"] }
                ]
            });
            await r.table("tickets").insert({ id: interaction.guild.id, askmodEnabled: true, askmodChannel: askmodChannel.id }, { conflict: "update" }).run(client.con)

            let embedEnableButtonsaskmodsSuccess = new MessageEmbed()
                .setTitle("Enable asking mods")
                .setDescription("\`\`\`diff\n+ [✅] Successfully enabled\`\`\`")
                .setColor("GREEN")
            await interaction.reply({ embeds: [embedEnableButtonsaskmodsSuccess] })
            break;
        case "enable_gissues":
            let gissuesChannel = await interaction.guild.channels.create("Guild issues", {
                type: "GUILD_CATEGORY",
                permissionOverwrites: [
                    { id: table.moderatorRole, allow: ["VIEW_CHANNEL", "SEND_MESSAGES"] },
                    { id: table.userRole, deny: ["VIEW_CHANNEL"] },
                    { id: interaction.guild.id, deny: ["VIEW_CHANNEL"] }
                ]
            });
            await r.table("tickets").insert({ id: interaction.guild.id, guildissueEnabled: true, guildIssuesChannel: gissuesChannel.id }, {conflict: "update"}).run(client.con);

            let embedEnableButtonsguildissuesSuccess = new MessageEmbed()
                .setTitle("Enable guild issues")
                .setDescription("\`\`\`diff\n+ [✅] Successfully enabled\`\`\`")
                .setColor("GREEN")
            await interaction.reply({ embeds: [embedEnableButtonsguildissuesSuccess] })
            break;
        case "enable_appeal":
            let appealChannel = await interaction.guild.channels.create("Appeals", {
                type: "GUILD_CATEGORY",
                permissionOverwrites: [
                    { id: table.moderatorRole, allow: ["VIEW_CHANNEL", "SEND_MESSAGES"] },
                    { id: table.userRole, deny: ["VIEW_CHANNEL"] },
                    { id: interaction.guild.id, deny: ["VIEW_CHANNEL"] }
                ]
            });
            await r.table("tickets").insert({id: interaction.guild.id, appealEnabled: true, appealChannel: appealChannel.id}, { conflict: "update" }).run(client.con)

            let embedEnableButtonsappealsSuccess = new MessageEmbed()
                .setTitle("Enable appeals")
                .setDescription("\`\`\`diff\n+ [✅] Successfully enabled\`\`\`")
                .setColor("GREEN")
            await interaction.reply({ embeds: [embedEnableButtonsappealsSuccess] })
            break;
        case "enable_archive":
            let archiveChannel = await interaction.guild.channels.create("Archive", {
                type: "GUILD_CATEGORY",
                permissionOverwrites: [
                    { id: table.moderatorRole, allow: ["VIEW_CHANNEL", "SEND_MESSAGES"] },
                    { id: table.userRole, deny: ["VIEW_CHANNEL"] },
                    { id: interaction.guild.id, deny: ["VIEW_CHANNEL"] }
                ]
            });
            await r.table("tickets").insert({ id: interaction.guild.id,  archiveEnabled: true,  archiveChannel: archiveChannel.id }, { conflict: "update" }).run(client.con)

            let embedEnableButtonsarchive = new MessageEmbed()
                .setTitle("Enable archive")
                .setDescription("\`\`\`diff\n+ [✅] Successfully enabled\`\`\`")
                .setColor("GREEN")
            await interaction.reply({ embeds: [embedEnableButtonsarchive] })
            break;
        case "disable_complaints":
            await r.table("tickets").insert({ id: interaction.guild.id, complaintsEnabled: false }, { conflict: "update" }).run(client.con)

            let embedDisableButtonsComplaintsSuccess = new MessageEmbed()
                .setTitle("Disable complaints")
                .setDescription("\`\`\`diff\n- [❌] Successfully disabled\`\`\`")
                .setColor("RED")
            await interaction.reply({ embeds: [embedDisableButtonsComplaintsSuccess] })
            break;
        case "disable_suggestions":
            await r.table("tickets").insert({ id: interaction.guild.id, suggestionsEnabled: false }, { conflict: "update" }).run(client.con)

            let embedDisableButtonsSuggestionsSuccess = new MessageEmbed()
                .setTitle("Disable suggestions")
                .setDescription("\`\`\`diff\n- [❌] Successfully disabled\`\`\`")
                .setColor("RED")
            await interaction.reply({ embeds: [embedDisableButtonsSuggestionsSuccess] })
            break;
        case "disable_askmod":
            await r.table("tickets").insert({ id: interaction.guild.id, askmodEnabled: false }, { conflict: "update" }).run(client.con)

            let embedDisableButtonsaskmodsSuccess = new MessageEmbed()
                .setTitle("Disable asking mods")
                .setDescription("\`\`\`diff\n- [❌] Successfully disabled\`\`\`")
                .setColor("RED")
            await interaction.reply({ embeds: [embedDisableButtonsaskmodsSuccess] })
            break
        case "disable_gissues":
            await r.table("tickets").insert({ id: interaction.guild.id, guildissueEnabled: false }, { conflict: "update" }).run(client.con)

            let embedDisableButtonsguildIssuesSuccess = new MessageEmbed()
                .setTitle("Disable guild issues")
                .setDescription("\`\`\`diff\n- [❌] Successfully disabled\`\`\`")
                .setColor("RED")
            await interaction.reply({ embeds: [embedDisableButtonsguildIssuesSuccess] })
            break;
        case "disable_appeal":
            await r.table("tickets").insert({
                id: interaction.guild.id,
                appealEnabled: false
            }, { conflict: "update" }).run(client.con)

            let embedDisableButtonsappealsSuccess = new MessageEmbed()
                .setTitle("Disable appeals")
                .setDescription("\`\`\`diff\n- [❌] Successfully disabled\`\`\`")
                .setColor("RED")
            await interaction.reply({embeds: [embedDisableButtonsappealsSuccess]})
            break;
        case "send_complaints":
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
                const embedSending = new MessageEmbed()
                    .setDescription("Sending...")
                    .setColor("YELLOW")

                const embedSent = new MessageEmbed()
                    .setDescription("Ticket successfully sent.")
                    .setColor("BLURPLE")

                await interaction.reply({ embeds: [embedSending], ephemeral: true });

                let complaintComponents = new MessageActionRow()
                    .addComponents(
                        new MessageButton()
                            .setCustomId("archive_complaint")
                            .setLabel("Archive")
                            .setStyle("PRIMARY"),
                        new MessageButton()
                            .setCustomId("delete_complaint")
                            .setLabel("DELETE")
                            .setStyle("DANGER")
                    )
                let row = new MessageActionRow()
                    .addComponents(
                        new MessageSelectMenu()
                            .setCustomId('select-menu-tickets-1')
                            .setPlaceholder('Move to another category')
                            .setMinValues(0)
                            .setMaxValues(1)
                            .addOptions([
                                { label: 'Suggestions', value: 'withoutcomplaint_suggestions', emoji: '💡', },
                                { label: 'Mod questions', value: 'withoutcomplaint_modquestions', emoji: '❓', },
                                { label: 'Issues', value: 'withoutcomplaint_issues', emoji: '❌', },
                                { label: 'Appeal', value: 'withoutcomplaint_appeal', emoji: '✅' },
                                { label: 'Complaints', value: 'complaint', emoji: '⛏️' }
                            ]),
                    );

                let embedComplaint = new MessageEmbed()
                    .setTitle("New complaint!")
                    .setDescription(`You can add more users to ticket with command /ticket add`)
                    .addField(`Description`, String(interaction.fields.getTextInputValue("describe_complaint") || "None"))
                    .addField(`Proofs`, String(interaction.fields.getTextInputValue("proofs_complaint") || "None"))
                    .setFooter({ text: "Too many components in this message! Clicking May Not Work the First Time\nYou cannot move complaints into the same complaints category."})
                    .setColor("GREEN")
                await ticketComplaintChannelPermissions.send({ embeds: [embedComplaint], components: [complaintComponents, row] }).then(m => m.pin())

                let embedImportant = new MessageEmbed()
                    .setDescription(`**DANGER:** User is not in channel! You must first verify that his data is worthy of consideration.\nConfirm with the command: \`/ticket add ${interaction.user.id}\``)
                    .setFooter({ text: `Ticket By: ${interaction.user.tag} [${interaction.user.id}]` })
                    .setColor("RED")
                await ticketComplaintChannelPermissions.send({ embeds: [embedImportant]}).then(m => m.pin());

                await interaction.editReply({ embeds: [embedSent], ephemeral: true})
            }).catch(() => null)
            break;
        case "archive_complaint":
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
            break;
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
        case "send_suggestions":
            const ticketSuggestionsModal = new Modal({
                customId: `ticketSuggestion-${interaction.id}`,
                title: "Send ticket",
                components: [
                    {
                        type: "ACTION_ROW", components: [
                            {
                                type: "TEXT_INPUT",
                                style: "PARAGRAPH",
                                customId: "describe_suggestions",
                                label: "Describe"
                            },
                        ]
                    },
                    {
                        type: "ACTION_ROW", components: [
                            {
                                type: "TEXT_INPUT",
                                style: "PARAGRAPH",
                                customId: "files_suggestion",
                                label: "Files (Image link, message link, etc)"
                            },
                        ]
                    },
                ]
            })

            const useModalSuggestions = async (
                sourceInteraction,
                ticketSuggestionsModal,
                timeout = 2 * 60 * 1000,
            ) => {
                await sourceInteraction.showModal(ticketSuggestionsModal);

                return sourceInteraction
                    .awaitModalSubmit({
                        time: timeout,
                        filter: (filterInteraction) =>
                            filterInteraction.customId === `ticketSuggestion-${sourceInteraction.id}`,
                    })
                    .catch(() => null);
            };

            const modalSubmitComplaintInteractionSuggestions = await useModalSuggestions(interaction, ticketSuggestionsModal)

            let ticketSuggestionChannelPermissions = await interaction.guild.channels.create(`suggestion-${interaction.user.tag}`, {
                parent: ticketCategories.suggestionsChannel,
                type: "GUILD_TEXT",
                permissionOverwrites: [
                    {id: table.moderatorRole, allow: ["VIEW_CHANNEL", "SEND_MESSAGES"]},
                    {id: table.userRole, deny: ["VIEW_CHANNEL"]},
                    {id: interaction.guild.id, deny: ["VIEW_CHANNEL"]},
                    {id: interaction.user.id, deny: ["VIEW_CHANNEL", "SEND_MESSAGES"]}
                ],
            });

            let embedSuggestion = new MessageEmbed()
                .setTitle("New suggestion!")
                .setDescription(`You can add more users to ticket with command /ticket add`)
                .addField(`Description`, String(modalSubmitComplaintInteractionSuggestions.fields.getTextInputValue("describe_suggestions") || "None"))
                .addField(`Proofs`, String(modalSubmitComplaintInteractionSuggestions.fields.getTextInputValue("files_suggestion") || "None"))
                .setColor("GREEN")
            await ticketSuggestionChannelPermissions.send({embeds: [embedSuggestion]})

            let embedImportantSuggestion = new MessageEmbed()
                .setDescription(`**DANGER:** User is not in channel! You must first verify that his data is worthy of consideration.\nConfirm with the command: \`/ticket add ${modalSubmitComplaintInteractionSuggestions.user.id}\``)
                .setFooter({text: `By: ${modalSubmitComplaintInteractionSuggestions.user.tag}`})
                .setColor("RED")
            await ticketSuggestionChannelPermissions.send({embeds: [embedImportantSuggestion]})

            modalSubmitComplaintInteractionSuggestions.reply("Successfully sent.")
            break;
        case "send_mod_questions":
            const ticketAskmodModal = new Modal({
                customId: `ticketModQuestion-${interaction.id}`,
                title: "Send mod question",
                components: [
                    {
                        type: "ACTION_ROW", components: [
                            {
                                type: "TEXT_INPUT",
                                style: "PARAGRAPH",
                                customId: "describe_question",
                                label: "Describe your question"
                            },
                        ]
                    },
                    {
                        type: "ACTION_ROW", components: [
                            {
                                type: "TEXT_INPUT",
                                style: "PARAGRAPH",
                                customId: "files_questions",
                                label: "Files (Image link, message link, etc)"
                            },
                        ]
                    },
                ]
            })

            const useModalQuestions = async (
                sourceInteraction,
                ticketAskmodModal,
                timeout = 2 * 60 * 1000,
            ) => {
                await sourceInteraction.showModal(ticketAskmodModal);

                return sourceInteraction
                    .awaitModalSubmit({
                        time: timeout,
                        filter: (filterInteraction) =>
                            filterInteraction.customId === `ticketQuestion-${sourceInteraction.id}`,
                    })
                    .catch(() => null);
            };

            const modalSubmitComplaintInteractionQuestions = await useModalQuestions(interaction, ticketAskmodModal)

            let ticketQuestionChannelPermissions = await interaction.guild.channels.create(`question-${interaction.user.tag}`, {
                parent: ticketCategories.askmodChannel,
                type: "GUILD_TEXT",
                permissionOverwrites: [
                    {id: table.moderatorRole, allow: ["VIEW_CHANNEL", "SEND_MESSAGES"]},
                    {id: table.userRole, deny: ["VIEW_CHANNEL"]},
                    {id: interaction.guild.id, deny: ["VIEW_CHANNEL"]},
                    {id: interaction.user.id, deny: ["VIEW_CHANNEL", "SEND_MESSAGES"]}
                ],
            });

            let embedQuestion = new MessageEmbed()
                .setTitle("New question!")
                .setDescription(`You can add more users to ticket with command /ticket add`)
                .addField(`Description`, String(modalSubmitComplaintInteractionQuestions.fields.getTextInputValue("describe_question") || "None"))
                .addField(`Proofs`, String(modalSubmitComplaintInteractionQuestions.fields.getTextInputValue("files_questions") || "None"))
                .setColor("GREEN")
            await ticketQuestionChannelPermissions.send({embeds: [embedQuestion]})


            let embedImportantQuestion = new MessageEmbed()
                .setDescription(`**DANGER:** User is not in channel! You must first verify that his data is worthy of consideration.\nConfirm with the command: \`/ticket add ${modalSubmitComplaintInteractionQuestions.user.id}\``)
                .setFooter({text: `By: ${modalSubmitComplaintInteractionQuestions.user.tag}`})
                .setColor("RED")
            await ticketQuestionChannelPermissions.send({embeds: [embedImportantQuestion]})

            modalSubmitComplaintInteractionQuestions.reply("Successfully sent.")
            break;
    }
}