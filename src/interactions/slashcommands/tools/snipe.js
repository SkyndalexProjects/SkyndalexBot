const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require("discord.js")
module.exports = {
    data: new SlashCommandBuilder()
        .setName("snipe")
        .setDescription("Snipe message."),

    async execute(client, interaction) {
        const snipe = await client?.snipes?.get(interaction.channel.id);

        if (!snipe) return interaction.reply({ content: "There is nothing to snipe!", ephemeral: true });

        const embed = new MessageEmbed()
            .setAuthor({ name: snipe.author, iconURL: snipe.avatarURL })
            .setDescription(snipe.content)
            .setColor("BLURPLE")
        await interaction.reply({ embeds: [embed] })
    }
}