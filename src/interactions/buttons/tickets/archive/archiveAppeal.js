module.exports = async (client, interaction) => {
    let table = await r.table("settings").get(interaction.guild.id).run(client.con);
    let ticketCategories = await r.table("tickets").get(interaction.guild.id).run(client.con); // TODO: fix error
}