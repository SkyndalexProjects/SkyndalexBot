const { Modal, MessageActionRow, TextInputComponent, MessageButton, MessageEmbed } = require("discord.js");
module.exports = async (client, interaction) => {
    const addItemToChecklistModal = new Modal()
        .setTitle("Add item to checklist")
        .setCustomId("add_item_to_checklist_modal")

    const addItemToChecklist_ChecklistID = new TextInputComponent()
        .setStyle("SHORT")
        .setRequired(true)
        .setPlaceholder("Checklist ID (/trello options)")
        .setMaxLength(100)
        .setCustomId("add_item_to_checklist_checklistId_component")
        .setLabel("Checklist ID")

    const addItemToChecklist_Name = new TextInputComponent()
        .setStyle("SHORT")
        .setRequired(true)
        .setPlaceholder("Your checklist item name")
        .setMaxLength(100)
        .setCustomId("add_item_to_checklist_name_component")
        .setLabel("Checklist Name")

    const addChecklistIdRow = new MessageActionRow().addComponents(addItemToChecklist_ChecklistID);
    const addItemToChecklistNameRow = new MessageActionRow().addComponents(addItemToChecklist_Name);

    addItemToChecklistModal.addComponents(addChecklistIdRow, addItemToChecklistNameRow);
    await interaction.showModal(addItemToChecklistModal);

    const addItemToChecklistFilter = (interaction) => interaction.customId === "add_item_to_checklist_modal";
    await interaction.awaitModalSubmit({ addItemToChecklistFilter, time: 15000 }).then(async interaction => {
        let checklistID = interaction.fields.getTextInputValue("add_item_to_checklist_checklistId_component")
        let checkListItemName = interaction.fields.getTextInputValue("add_item_to_checklist_name_component")

        let addItemConfirm = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setCustomId("add_item_confirm")
                    .setStyle("SUCCESS")
                    .setLabel("Confirm")
            )

        let messageConfirmEmbed4 = new MessageEmbed()
            .setTitle("Are you sure?")
            .setDescription("You provided these values:")
            .addField(`Checklist ID`, `${checklistID}`)
            .addField(`Item name`, `${checkListItemName}`)
            .setColor("BLUE")
        await interaction.reply({embeds: [messageConfirmEmbed4], components: [addItemConfirm]})
    })
}