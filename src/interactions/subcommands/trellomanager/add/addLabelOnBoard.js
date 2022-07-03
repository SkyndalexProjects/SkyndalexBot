const { Modal, MessageActionRow, TextInputComponent, MessageButton, MessageEmbed } = require("discord.js");
module.exports = async (client, interaction) => {
    const addLabelToBoardModal = new Modal()
        .setTitle("Add label on board")
        .setCustomId("add_label_on_board_modal")

    const addLabelToBoard_LabelName = new TextInputComponent()
        .setStyle("SHORT")
        .setRequired(true)
        .setPlaceholder("Label name)")
        .setMaxLength(100)
        .setCustomId("add_label_name_modal_component")
        .setLabel("Label name")

    const addLabelToBoard_LabelColor = new TextInputComponent()
        .setStyle("PARAGRAPH")
        .setRequired(true)
        .setPlaceholder("yellow/purple/blue/red/green/orange/black/sky/pink/lime")
        .setMaxLength(100)
        .setCustomId("add_label_color_modal_component")
        .setLabel("Label color")

    const addLabelToBoard_BoardId = new TextInputComponent()
        .setStyle("SHORT")
        .setRequired(true)
        .setPlaceholder("Board ID")
        .setMaxLength(100)
        .setCustomId("add_label_board_id_modal_component")
        .setLabel("Board ID")

    const addLabelNameRow = new MessageActionRow().addComponents(addLabelToBoard_LabelName);
    const addLabelColorRow = new MessageActionRow().addComponents(addLabelToBoard_LabelColor);
    const addLabelBoardIdRow = new MessageActionRow().addComponents(addLabelToBoard_BoardId)

    addLabelToBoardModal.addComponents(addLabelNameRow, addLabelColorRow, addLabelBoardIdRow);
    await interaction.showModal(addLabelToBoardModal);

    const addLabelModalFilter = (interaction) => interaction.customId === "add_label_on_board_modal";
    await interaction.awaitModalSubmit({ addLabelModalFilter, time: 15000 }).then(async interaction => {
        let labelName = interaction.fields.getTextInputValue("add_label_name_modal_component")
        let labelColor = interaction.fields.getTextInputValue("add_label_color_modal_component")
        let boardId = interaction.fields.getTextInputValue("add_label_board_id_modal_component")

        let addLabelToBoardConfirm = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setCustomId("add_label_to_board_confirm")
                    .setStyle("SUCCESS")
                    .setLabel("Confirm")
            )

        let messageConfirmEmbed4 = new MessageEmbed()
            .setTitle("Are you sure?")
            .setDescription("You provided these values:")
            .addField(`Label name`, `${labelName}`)
            .addField(`Label color`, `${labelColor}`)
            .addField(`Board ID`, `${boardId}`)
            .setColor("BLUE")
        await interaction.reply({embeds: [messageConfirmEmbed4], components: [addLabelToBoardConfirm]})
    })
}