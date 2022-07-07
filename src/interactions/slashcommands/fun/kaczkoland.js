const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageActionRow, MessageButton, MessageSelectMenu} = require("discord.js")
const { fetch } = require("undici")
module.exports = {
    data: new SlashCommandBuilder()
        .setName("kaczkoland")
        .setDescription("Get kaczkoland player/server info")
        .addStringOption(player => player.setName("player").setDescription("Kaczkoland player")),

    async execute(client, interaction) {
        if (interaction.options.getString("player")) {
            const player = await interaction.options.getString("player");

            await interaction.reply(`podany gracz: ${player}`)
        } else {
            const topPlayers = new MessageActionRow()
                .addComponents(
                    new MessageSelectMenu()
                        .setCustomId("server_stats")
                        .setPlaceholder("Top")
                        .addOptions([
                            { label: `⛏️ Mined blocks`, description: "Get kaczkoland mined blocks top ", value: `kaczkoland_minedblocks` },
                            { label: `🫱 Placed blocks`, description: "Get kaczkoland placed blocks top", value: "kaczkoland_placedblocks" },
                            { label: `⚙️ Crafted items`, description: "Get kaczkoland crafter items top", value: "kaczkoland_crafteditems" },
                            { label: `💀 Deaths`, description: "Get kaczkoland deaths top", value: "kaczkoland_deaths" },
                            { label: `⚔️ Killed mobs`, description: "Get kaczkoland killed mobs top", value: "kaczkoland_killedmobs"},
                            { label: `⏰ Played time`, description: "Get kaczkoland played time top", value: "kaczkoland_playedtime"},
                            { label: `💵 Money`, description: "Get kaczkoland money top", value: "kaczkoland_money"},
                        ])
                );

            const data = await fetch("https://api.kaczkoland.pl/v2/getSumData")
            const json = await data.json()

            const embed = new MessageEmbed()
                .setDescription(`⛏️ Mined blocks: ${json.data.minedBlocks}\n🫱 Placed blocks: ${json.data.placedBlocks}\n⚙️ Crafted items: ${json.data.craftedItems}\n💀 All deaths: ${json.data.allDeaths}\n⚔️ Killed mobs: ${json.data.killedMobs}\n⏰ Played time: ${json.data.playedTime}\n💎 Mined diamonds: ${json.data.minedDiamonds}\n👤 Total users: ${json.data.totalUsers}\n💵 Total money: ${json.data.money}`)
                .setColor("BLURPLE")
            await interaction.reply({ embeds: [embed], components: [topPlayers] })

        }
    }
}