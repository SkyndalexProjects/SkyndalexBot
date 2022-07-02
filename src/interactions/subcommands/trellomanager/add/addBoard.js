const { SlashCommandAssertions } = require("@discordjs/builders");
const { Modal, MessageActionRow, TextInputComponent, MessageButton, MessageEmbed } = require("discord.js");
module.exports = async (client, interaction) => {
    const addBoardModal = new Modal()
    .setTitle("Add board")
    .setCustomId("addBoard")

const addBoardModalComponent_NAME = new TextInputComponent()
    .setStyle("SHORT")
    .setRequired(true)
    .setPlaceholder("Board Name")
    .setMaxLength(100)
    .setCustomId("addBoard_name")
    .setLabel("Board name")

const addBoardModalComponent_ORGANIZATIONID = new TextInputComponent()
    .setStyle("SHORT")
    .setPlaceholder("Organization ID")
    .setMaxLength(100)
    .setCustomId("addBoard_organizationID")
    .setLabel("Organization ID")

const addBoardModalComponent_DESCRIPTION = new TextInputComponent()
    .setStyle("PARAGRAPH")
    .setRequired(true)
    .setPlaceholder("Description")
    .setMaxLength(100)
    .setCustomId("addBoard_description")
    .setLabel("Description")
const firstActionRow = new MessageActionRow().addComponents(addBoardModalComponent_NAME)
const secondActionRow = new MessageActionRow().addComponents(addBoardModalComponent_ORGANIZATIONID)
const threeActionRow = new MessageActionRow().addComponents(addBoardModalComponent_DESCRIPTION)

addBoardModal.addComponents(firstActionRow, secondActionRow, threeActionRow)
await interaction.showModal(addBoardModal)

const filter = (interaction) => interaction.customId === "addBoard";
await interaction.awaitModalSubmit({ filter, time: 15_000 }).then(async interaction => {
    let boardName = interaction.fields.getTextInputValue("addBoard_name");
    let organizationID = interaction.fields.getTextInputValue("addBoard_organizationID");
    let boardDescription = interaction.fields.getTextInputValue("addBoard_description");

    let boardAddConfirm = new MessageActionRow()
        .addComponents(
            new MessageButton()
                .setCustomId("board_add_confirm")
                .setStyle("SUCCESS")
                .setLabel("Confirm")
        )

    let messageConfirmEmbed3 = new MessageEmbed()
        .setTitle("Are you sure?")
        .setDescription("You provided these values:")
        .addField(`Board name`, `${boardName}`)
        .addField(`Organization ID`, `${organizationID || "None"}`)
        .addField(`Board description`, `${boardDescription || "None"}`)
        .setColor("BLUE")
    await interaction.reply({ embeds: [messageConfirmEmbed3], components: [boardAddConfirm] })
}); 
}