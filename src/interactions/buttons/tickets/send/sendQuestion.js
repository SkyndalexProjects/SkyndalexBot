const {Modal, MessageEmbed, TextInputComponent, MessageActionRow} = require("discord.js");
module.exports = async (client, interaction) => {
    let table = await r.table("settings").get(interaction.guild.id).run(client.con);
    let ticketCategories = await r.table("tickets").get(interaction.guild.id).run(client.con); // TODO: fix error
    if (interaction.customId === "send_mod_questions") {
        const ticketAskmodModal  = new Modal()
            .setTitle("Send question")
            .setCustomId(`ticketModQuestion`)

        const questionDescription = new TextInputComponent()
            .setStyle("PARAGRAPH")
            .setRequired(true)
            .setPlaceholder("Question description")
            .setMaxLength(100) // test
            .setCustomId("describe_question")
            .setLabel("Questiond escription")

        const questionFiles = new TextInputComponent()
            .setStyle("SHORT")
            .setPlaceholder("Image/Gif URL (etc. https://imgur.com/NQinKJB)")
            .setMaxLength(100)
            .setCustomId("files_questions")
            .setLabel("Files")

        const firstActionRow = new MessageActionRow().addComponents(questionDescription)
        const secondActionRow = new MessageActionRow().addComponents(questionFiles)

        ticketAskmodModal.addComponents(firstActionRow, secondActionRow)
        await interaction.showModal(ticketAskmodModal)

        let ticketQuestionChannelPermissions = await interaction.guild.channels.create(`question-${interaction.user.tag}`, {
            parent: ticketCategories.askmodChannel,
            type: "GUILD_TEXT",
            permissionOverwrites: [
                {id: table.moderatorRole, allow: ["VIEW_CHANNEL", "SEND_MESSAGES"]},
                {id: table.userRole, deny: ["VIEW_CHANNEL"]},
                {id: interaction.guild.id, deny: ["VIEW_CHANNEL"]},
            ],
        });


        const filter = (interaction) => interaction.customId === `ticketModQuestion`;
        await interaction.awaitModalSubmit({ filter, time: 15000 }).then(async interaction => {
            const embedSending = new MessageEmbed()
                .setDescription("Sending...")
                .setColor("YELLOW")

            const embedSent = new MessageEmbed()
                .setDescription("Ticket successfully sent. You were not added to the ticket because the moderator has to do it manually [the administrator can enable automatic addition of users in the settings].")
                .setColor("BLURPLE")

            await interaction.reply({ embeds: [embedSending], ephemeral: true });

            let embedQuestion = new MessageEmbed()
                .setTitle("New question!")
                .setDescription(`You can add more users to ticket with command /ticket add`)
                .addField(`Description`, String(interaction.fields.getTextInputValue("describe_question") || "None"))
                .addField(`Proofs`, String(interaction.fields.getTextInputValue("files_questions") || "None"))
                .setColor("GREEN")
            await ticketQuestionChannelPermissions.send({embeds: [embedQuestion]})


            let embedImportantQuestion = new MessageEmbed()
                .setDescription(`**DANGER:** User is not in channel! You must first verify that his data is worthy of consideration.\nConfirm with the command: \`/ticket add ${interaction.user.id}\``)
                .setFooter({text: `By: ${interaction.user.tag}`})
                .setColor("RED")
            await ticketQuestionChannelPermissions.send({embeds: [embedImportantQuestion]})

            await interaction.editReply({ embeds: [embedSent], ephemeral: true });
        }).catch(() => null)
    }
}