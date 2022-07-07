const { fetch } = require("undici")
const {Message, MessageEmbed} = require("discord.js");
module.exports = async (client, interaction) => {
    if (!interaction.isSelectMenu() || interaction.customId !== "server_stats" || interaction.values[0] !== "kaczkoland_minedblocks") return;

    const topData = await fetch("https://api.kaczkoland.pl/v2/getTopPlayers")
    const json = await topData.json()

    const x = []
    for (let i in json.data.minedBlocks) {
        x.push(json.data.minedBlocks[i].player.name)
    }

    const embed = new MessageEmbed()
        .setDescription(`${x.join(",\n")}`)
        .setColor("BLURPLE")
    await interaction.update({ embeds: [embed] })
}