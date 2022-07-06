const { MessageEmbed } = require("discord.js");
module.exports = async (client, interaction) => {
    if (!interaction.isSelectMenu() || interaction.customId !== "channels_settings" || interaction.values[0] !== "modlog_channel") return;

    const embed = new MessageEmbed()
        .setDescription(`Please mention your images channel, or enter its ID`)
        .setColor("BLURPLE")
    await interaction.reply({ embeds: [embed] })

    let filter =  m => m.author.id === interaction.user.id;
    const collector = interaction.channel.createMessageCollector({ filter, time: 15000 });

    collector.on('collect', async m => {
        const channel = m?.mentions?.channels?.first() || m?.guild?.channels?.cache?.get(m?.content)
        if (!channel?.id) {
            return interaction.channel.send(`${interaction.user.tag}, It's not channel!`)
        }

        await r.table("settings").insert({
            id: interaction.guild.id,
            modlogChannel: channel.id,
        }, { conflict: "update" }).run(client.con)

        const embedSuccessfully = new MessageEmbed()
            .setDescription(`Successfully added mod log channel to database!\nNew value: ${channel.name} (<#${channel.id}>)\nYou have a few seconds to change your channel. `)
            .setColor("GREEN")
        await interaction.editReply({ embeds: [embedSuccessfully] });
    });

    collector.on('end', async collected => {
        await interaction.editReply( { content: "Your time to complete the options is over.", embeds: [] })
        collector.stop()
    });
}