module.exports = async (client, interaction) => {
    let table = await r.table("settings").get(interaction.guild.id).run(client.con);

    if (interaction.customId === "") {

    }
}