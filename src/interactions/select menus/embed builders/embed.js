
const { MessageEmbed, Modal, TextInputComponent, MessageActionRow} = require("discord.js");
module.exports = async (client, interaction) => {
    if (!interaction.isSelectMenu() || interaction.customId !== "embed_settings" || interaction.values[0] !== "general_selectmenu_embed_option") return;

    const modal = new Modal()
        .setTitle("Embed builder - General settings")
        .setCustomId("embed_modal")

    const embedTitle = new TextInputComponent()
        .setStyle("SHORT")
        .setPlaceholder("Embed title")
        .setMaxLength(100)
        .setCustomId("embed_title")
        .setLabel("Embed title")

    const embedDescription = new TextInputComponent()
        .setStyle("PARAGRAPH")
        .setPlaceholder("Embed description")
        .setMaxLength(100)
        .setCustomId("embed_description")
        .setLabel("Embed description")

    const embedFooter = new TextInputComponent()
        .setStyle("SHORT")
        .setPlaceholder("Footer")
        .setMaxLength(100)
        .setCustomId("embed_footer")
        .setLabel("Embed footer")

    const embedAuthor = new TextInputComponent()
        .setStyle("SHORT")
        .setPlaceholder("Embed author")
        .setMaxLength(100)
        .setCustomId("embed_author")
        .setLabel("Embed author")

    const firstActionRow = new MessageActionRow().addComponents(embedTitle)
    const secondActionRow = new MessageActionRow().addComponents(embedDescription)
    const threeActionRow = new MessageActionRow().addComponents(embedFooter)
    const fourActionRow = new MessageActionRow().addComponents(embedAuthor)

    modal.addComponents(firstActionRow, secondActionRow, threeActionRow, fourActionRow)
    await interaction.showModal(modal)

}