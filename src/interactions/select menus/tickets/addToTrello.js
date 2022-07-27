const { MessageEmbed, Modal, MessageActionRow, MessageButton } = require("discord.js");
const { fetch } = require("undici")
module.exports = async (client, interaction) => {
    if (!interaction.isSelectMenu() || interaction.customId !== "ticket_actions" || interaction.values[0] !== "trello_addticket") return;
    const db = await r.table("trello").get(interaction.user.id).run(client.con);
    const settings = await r.table("settings").get(interaction.guild.id).run(client.con);

    if (!db?.key || !db?.token) return interaction.reply({ content: "You are not authorized!", ephemeral: true });

    const embed = interaction.message.embeds[0]
    const ticketContent = embed.fields[0].value;

    await fetch(`https://api.trello.com/1/cards?idList=${settings.suggestionTrelloListId}&key=${db.key}&token=${db.token}&name=${ticketContent}&desc=Added with Skyndalex bot with ${interaction.user.tag}`,
        { method: "POST" }
    );

    await interaction.reply({ content: `Added to trello`})
}