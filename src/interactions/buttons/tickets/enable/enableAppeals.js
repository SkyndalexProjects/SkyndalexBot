const {MessageEmbed} = require("discord.js");
module.exports = async (client, interaction) => {
    if (interaction.customId === "enable_appeal") {
        let table = await r.table("settings").get(interaction.guild.id).run(client.con);

        let appealChannel = await interaction.guild.channels.create("Appeals", {
            type: "GUILD_CATEGORY",
            permissionOverwrites: [
                { id: table.moderatorRole, allow: ["VIEW_CHANNEL", "SEND_MESSAGES"] },
                { id: table.userRole, deny: ["VIEW_CHANNEL"] },
                { id: interaction.guild.id, deny: ["VIEW_CHANNEL"] }
            ]
        });
        await r.table("tickets").insert({id: interaction.guild.id, appealEnabled: true, appealChannel: appealChannel.id}, { conflict: "update" }).run(client.con)

        let embedEnableButtonsappealsSuccess = new MessageEmbed()
            .setTitle("Enable appeals")
            .setDescription("\`\`\`diff\n+ [✅] Successfully enabled\`\`\`")
            .setColor("GREEN")
        await interaction.reply({ embeds: [embedEnableButtonsappealsSuccess] })
    }
}