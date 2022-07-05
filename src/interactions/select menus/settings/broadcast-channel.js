const { MessageEmbed } = require("discord.js");
module.exports = async (client, interaction) => {
    if (!interaction.isSelectMenu() || interaction.customId !== "channels_settings" || interaction.values[0] !== "broadcast_channel") return;

        const embed = new MessageEmbed()
            .setDescription(`Please mention your announcement channel, or enter its ID`)
            .setColor("BLURPLE")
        await interaction.reply({ embeds: [embed] })

        let filter =  m => m.author.id === interaction.user.id;
        const collector = interaction.channel.createMessageCollector({ filter, time: 25000 });

        collector.on('collect', async m => {
            const channel = m.mentions.channels.first()

            const embedSuccessfully = new MessageEmbed()
                .setDescription(`Successfully added broadcast channel to database!\nData: ${channel.name} (<#${channel.id}>) `)
                .setColor("GREEN")
            await interaction.editReply({ embeds: [embedSuccessfully] });
            collector.stop()
        })

        collector.on('end', async collected => {
            await interaction.editReply( { content: "Your time to complete the options is over.", embeds: [] })
        });
}