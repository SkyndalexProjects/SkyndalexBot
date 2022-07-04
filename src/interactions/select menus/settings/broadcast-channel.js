const { MessageEmbed } = require("discord.js");
module.exports = async (client, interaction) => {
    if (!interaction.isSelectMenu() !== interaction.customId !== "channel_settings" || interaction.values[0] !== "broadcast_channel") {
        const embed = new MessageEmbed()
            .setDescription(`Please mention your announcement channel, or enter its ID`)
            .setColor("BLURPLE")
        await interaction.reply({ embeds: [embed] })

        let filter = m => m.content.toLowerCase();
        const collector = interaction.channel.createMessageCollector({ filter, time: 15000});

        collector.on('collect', async m => {
            const channel = m.mentions.channels.first()

            const embedSuccessfully = new MessageEmbed()
                .setDescription(`Successfully added broadcast channel to database!\nData: ${channel.name} (<#${channel.id}>) `)
                .setColor("GREEN")
            await interaction.update({ embeds: [embedSuccessfully] })
        })

        collector.on('end', async collected => {
            await interaction.update(`Collected ${collected} items`)
        });
    }
}