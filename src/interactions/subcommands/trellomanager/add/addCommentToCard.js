const { Modal, MessageActionRow, TextInputComponent, MessageButton, MessageEmbed } = require("discord.js");
module.exports = async (client, interaction) => {
    const addCommentToCardModal = new Modal()
        .setTitle("Add comment")
        .setCustomId("add_comment_to_card_modal")

    const addCommentToCard_CardID = new TextInputComponent()
        .setStyle("SHORT")
        .setRequired(true)
        .setPlaceholder("Card ID (get card ids: /trello options)")
        .setMaxLength(100)
        .setCustomId("add_comment_card_id_component")
        .setLabel("Card ID")

    const addCommentToCard_Text = new TextInputComponent()
        .setStyle("PARAGRAPH")
        .setRequired(true)
        .setPlaceholder("Comment")
        .setMaxLength(1000)
        .setCustomId("add_comment_description_component")
        .setLabel("Comment description")

    const addCommentCardIdRow = new MessageActionRow().addComponents(addCommentToCard_CardID)
    const addCommentDescriptionRow = new MessageActionRow().addComponents(addCommentToCard_Text)

    addCommentToCardModal.addComponents(addCommentCardIdRow, addCommentDescriptionRow)
    await interaction.showModal(addCommentToCardModal)

    const addCommentFilter = (interaction) => interaction.customId === "add_comment_to_card_modal";
    await interaction.awaitModalSubmit({ addCommentFilter, time: 15000 }).then(async interaction => {
        let cardID = interaction.fields.getTextInputValue("add_comment_card_id_component")
        let commentDescription = interaction.fields.getTextInputValue("add_comment_description_component")

        let addCommentConfirm = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setCustomId("add_comment_confirm")
                    .setStyle("SUCCESS")
                    .setLabel("Confirm")
            )

        let messageConfirmEmbed4 = new MessageEmbed()
            .setTitle("Are you sure?")
            .setDescription("You provided these values:")
            .addField(`Card ID`, `${cardID}`)
            .addField(`Comment description`, `${commentDescription || "None"}`)
            .setColor("BLUE")
        await interaction.reply({embeds: [messageConfirmEmbed4], components: [addCommentConfirm]})
    }).catch(() => null)
}