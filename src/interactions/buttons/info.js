const { Modal, TextInputComponent, MessageActionRow, MessageButton, MessageEmbed } = require("discord.js");
exports.run = async (client, interaction) => {
    switch (interaction.customId) {
        case "info_bug_submit":
            const bugSubmitModal = new Modal()
                .setTitle("Send bug")
                .setCustomId("bugSubmit")

            const description = new TextInputComponent()
                .setStyle("PARAGRAPH")
                .setRequired(true)
                .setPlaceholder("Bug description")
                .setMaxLength(100)
                .setCustomId("bugDescription")
                .setLabel("Bug description")

            const attachments = new TextInputComponent()
                .setStyle("SHORT")
                .setPlaceholder("Links to attachments")
                .setMaxLength(100)
                .setCustomId("bugAttachments")
                .setLabel("your attachments")

            const firstActionRow = new MessageActionRow().addComponents(description);
            const secondActionRow = new MessageActionRow().addComponents(attachments);

            await bugSubmitModal.addComponents(firstActionRow, secondActionRow)
            await interaction.showModal(bugSubmitModal);

            const filter = (interaction) => interaction.customId === "bugSubmit";
            await interaction.awaitModalSubmit({ filter, time: 15000 }).then(async interaction => {
                const bugChannel = "993494082666106984"

                let description = interaction.fields.getTextInputValue("bugDescription")
                let attachments = interaction.fields.getTextInputValue("bugAttachments")

                const embed = new MessageEmbed()
                    .setAuthor({ name: interaction.user.tag, iconURL: interaction.user.avatarURL() })
                    .setFooter({ text: `User ID: ${interaction.user.id}`})
                    if (attachments) embed.addField(`Attachments`, String(attachments))
                    .setDescription(description)
                    .setColor("BLURPLE")
                client.channels.cache.get(bugChannel).send({ embeds: [embed] })

                const embedSuccessfully = new MessageEmbed()
                    .setDescription(`Bug successfully sent.`)
                    .setColor("GREEN")
                await interaction.reply({ embeds: [embedSuccessfully], ephemeral: true })
            }).catch(() => null)
            break;
    }
}