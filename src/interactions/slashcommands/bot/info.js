const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js")
const osu = require('node-os-utils')
module.exports = {
    data: new SlashCommandBuilder()
        .setName("info")
        .setDescription("Info command"),

    async execute(client, interaction) {

        let row = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setCustomId("info_bug_submit")
                    .setLabel("Report bug")
                    .setStyle("DANGER"),
                new MessageButton()
                    .setCustomId("info_suggest_submit")
                    .setLabel("Send suggestion")
                    .setStyle("SUCCESS")
            );

        let links = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setLabel("Documentation")
                    .setStyle("LINK")
                    .setURL("https://docs.skyndalex.xyz"),
                new MessageButton()
                    .setLabel("Site")
                    .setStyle("LINK")
                    .setURL("https://skyndalex.xyz"),
                new MessageButton()
                    .setLabel("Status")
                    .setStyle("LINK")
                    .setURL("https://status.skyndalex.xyz"),
            );

        let embed = new MessageEmbed()
            .setTitle("Bot info")
            .setDescription(`š Webpage: **https://skyndalex.xyz**\nš Full metrics: **https://stats.skyndalex.xyz**\nš Documentation: **https://docs.skyndalex.xyz**\n`)
            .addField("š Cache statistics", `\nGuilds: ${client.guilds.cache.size}\nUsers: ${client.users.cache.size} **(Users caching disabled)**\nChannels: ${client.channels.cache.size}\nEmojis: ${client.emojis.cache.size}\n`)
            .addField("\nāļø System stats", `h`)
            .setColor("BLURPLE")
        await interaction.reply({ embeds: [embed], components: [row, links] })
    }
}