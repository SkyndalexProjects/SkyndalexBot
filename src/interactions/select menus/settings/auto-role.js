const { MessageEmbed } = require("discord.js");
module.exports = async (client, interaction) => {
    if (!interaction.isSelectMenu() || interaction.customId !== "roles_settings" || interaction.values[0] !== "automatic_role") return;

    const embed = new MessageEmbed()
        .setDescription(`Please mention your auto role, or enter its ID`)
        .setColor("BLURPLE")
    await interaction.reply({ embeds: [embed] })

    let filter =  m => m.author.id === interaction.user.id;
    const collector = interaction.channel.createMessageCollector({ filter, time: 15000 });

    collector.on('collect', async m => {
        const role = m?.mentions?.roles?.first() || m?.guild?.roles?.cache?.get(m?.content)
        if (!role?.id) {
            return interaction.channel.send(`${interaction.user.tag}, It's not role!`)
        }

        await r.table("settings").insert({
            id: interaction.guild.id,
            autoRole: role.id,
        }, { conflict: "update" }).run(client.con)

        const embedSuccessfully = new MessageEmbed()
            .setDescription(`Successfully added auto role to database!\nNew value: ${role.name} (<@&${role.id}>)\nYou have a few seconds to change your channel. `)
            .setColor("GREEN")
        await interaction.editReply({ embeds: [embedSuccessfully] });
    });

    collector.on('end', async collected => {
        await interaction.editReply( { content: client.strings.set.TIMED_OUT, embeds: [] })
        collector.stop()
    });
}