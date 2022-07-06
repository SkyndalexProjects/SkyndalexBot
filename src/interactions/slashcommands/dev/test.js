const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageSelectMenu, MessageEmbed } = require("discord.js")
const { fetch } = require("undici");
module.exports = {
    data: new SlashCommandBuilder()
        .setName("test")
        .setDescription("test command"),
    async execute(client, interaction) {
        const embed = new MessageEmbed()
            .setColor('#4ccdea')
            .setTitle('Select a channel below.')
            .setTimestamp()

        let selectmenu = new MessageActionRow().addComponents(
            new MessageSelectMenu()
                .setCustomId('channel')
                .setPlaceholder('Nothing selected')
                .addOptions([
                    {
                        label: `❌ Cancel`,
                        description: 'Cancel the channel selection',
                        value: 'cancel',
                    },
                ]),
        );

        interaction.guild.channels.cache.first(24).map((channel) => {
            if (["GUILD_NEWS", "GUILD_TEXT"].includes(channel.type)) {
                selectmenu.components[0].addOptions([
                    {
                        label: `📒 ${channel.name}`,
                        description: `This is "${channel.name}" channel`,
                        value: `${channel.id}`,
                    },
                ]);
            }
        })
        await interaction.reply({ embeds: [embed], components: [selectmenu] });
    }
}