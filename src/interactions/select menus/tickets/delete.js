const { MessageEmbed, Modal, MessageActionRow, MessageButton } = require("discord.js");
const { fetch } = require("undici")
module.exports = async (client, interaction) => {
    if (!interaction.isSelectMenu() || interaction.customId !== "ticket_actions" || interaction.values[0] !== "trello_addticket") return;

}