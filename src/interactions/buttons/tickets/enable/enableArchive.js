const {MessageEmbed} = require("discord.js");
module.exports = async (client, interaction) => {
    if (interaction.customId === "enable_archive") {
        let table = await r.table("settings").get(interaction.guild.id).run(client.con);

        let archiveChannel = await interaction.guild.channels.create("Archive", {
            type: "GUILD_CATEGORY",
            permissionOverwrites: [
                { id: table.moderatorRole, allow: ["VIEW_CHANNEL", "SEND_MESSAGES"] },
                { id: table.userRole, deny: ["VIEW_CHANNEL"] },
                { id: interaction.guild.id, deny: ["VIEW_CHANNEL"] }
            ]
        });
        await r.table("tickets").insert({ id: interaction.guild.id,  archiveEnabled: true,  archiveChannel: archiveChannel.id }, { conflict: "update" }).run(client.con)

        let embedEnableButtonsarchive = new MessageEmbed()
            .setTitle("Enable archive")
            .setDescription("\`\`\`diff\n+ [✅] Successfully enabled\`\`\`")
            .setColor("GREEN")
        await interaction.reply({ embeds: [embedEnableButtonsarchive] })
    }
}