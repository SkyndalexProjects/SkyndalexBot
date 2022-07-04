const { Modal, MessageActionRow, TextInputComponent, MessageButton, MessageEmbed } = require("discord.js");
module.exports = async (client, interaction) => {
    const addLabelToBoardModal = new Modal()
        .setTitle("Add list on board")
        .setCustomId("add_list_on_board_modal")

    const addListOnBoard_ListName = new TextInputComponent()
        .setStyle("SHORT")
        .setRequired(true)
        .setPlaceholder("List name")
        .setMaxLength(100)
        .setCustomId("add_list_on_board_modal_component")
        .setLabel("List name")


    const addLabelToBoard_BoardId = new TextInputComponent()
        .setStyle("SHORT")
        .setRequired(true)
        .setPlaceholder("Board ID")
        .setMaxLength(100)
        .setCustomId("add_list_to_board_board_id_modal_component")
        .setLabel("Board ID")

    const addListOnBoardRow = new MessageActionRow().addComponents(addListOnBoard_ListName);
    const addListOnBoardRow2 = new MessageActionRow().addComponents(addLabelToBoard_BoardId);

    addLabelToBoardModal.addComponents(addListOnBoardRow, addListOnBoardRow2);
    await interaction.showModal(addLabelToBoardModal);

        const addListToBoardModalFilter = (interaction) => interaction.customId === "add_list_on_board_modal";
        await interaction.awaitModalSubmit({ addListToBoardModalFilter, time: 15000 }).then(async interaction => {
            let listName = interaction.fields.getTextInputValue("add_list_on_board_modal_component")
            let boardId = interaction.fields.getTextInputValue("add_list_to_board_board_id_modal_component")

            let addListToBoardConfirm = new MessageActionRow()
                .addComponents(
                    new MessageButton()
                        .setCustomId("add_list_to_board_confirm")
                        .setStyle("SUCCESS")
                        .setLabel("Confirm")
                )

            let messageConfirmEmbed4 = new MessageEmbed()
                .setTitle("Are you sure?")
                .setDescription("You provided these values:")
                .addField(`List name`, `${listName}`)
                .addField(`Board ID`, `${boardId}`)
                .setColor("BLUE")
            await interaction.reply({embeds: [messageConfirmEmbed4], components: [addListToBoardConfirm]})
        }).catch(() => null)
}