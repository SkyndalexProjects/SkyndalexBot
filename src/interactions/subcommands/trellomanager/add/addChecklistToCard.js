const { Modal, MessageActionRow, TextInputComponent, MessageButton, MessageEmbed } = require("discord.js");
module.exports = async (client, interaction) => {
    const addCheckListModal = new Modal()
        .setTitle("Add check list")
        .setCustomId("add_check_list_modal")

    const addCheckList_CardID = new TextInputComponent()
        .setStyle("SHORT")
        .setRequired(true)
        .setPlaceholder("Card ID (get card ids: /trello options)")
        .setMaxLength(100)
        .setCustomId("add_check_list_card_id_component")
        .setLabel("Card ID")

    const addCheckList_Name = new TextInputComponent()
        .setStyle("SHORT")
        .setRequired(true)
        .setPlaceholder("Checklist name")
        .setMaxLength(100)
        .setCustomId("add_check_list_name_component")
        .setLabel("Add checklist")

    const addChecklistCardIdRow = new MessageActionRow().addComponents(addCheckList_CardID)
    const addChecklistNameRow = new MessageActionRow().addComponents(addCheckList_Name)

    addCheckListModal.addComponents(addChecklistCardIdRow, addChecklistNameRow)
    await interaction.showModal(addCheckListModal)

    const addChecklistFilter = (interaction) => interaction.customId === "add_check_list_modal";
     await interaction.awaitModalSubmit({ addChecklistFilter, time: 15000 }).then(async interaction => {
        let cardID = interaction.fields.getTextInputValue("add_check_list_card_id_component");
        let checklistName = interaction.fields.getTextInputValue("add_check_list_name_component");

        let addChecklistConfirm = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setCustomId("add_checklist_confirm")
                    .setStyle("SUCCESS")
                    .setLabel("Confirm")
            )

        let messageConfirmEmbed3 = new MessageEmbed()
            .setTitle("Are you sure?")
            .setDescription("You provided these values:")
            .addField(`Card ID`, `${cardID}`)
            .addField(`Checklist name`, `${checklistName || "None"}`)
            .setColor("BLUE")
        await interaction.reply({ embeds: [messageConfirmEmbed3], components: [addChecklistConfirm] })
    }).catch(() => null)
}