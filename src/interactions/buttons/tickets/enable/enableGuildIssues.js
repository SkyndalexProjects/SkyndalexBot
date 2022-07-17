const {MessageEmbed} = require("discord.js");
module.exports = async (client, interaction) => {
    if (interaction.customId === "enable_gissues") {
        let table = await r.table("settings").get(interaction.guild.id).run(client.con);

        let gissuesChannel = await interaction.guild.channels.create("Guild issues", {
            type: "GUILD_CATEGORY",
            permissionOverwrites: [
                { id: table.moderatorRole, allow: ["VIEW_CHANNEL", "SEND_MESSAGES"] },
                { id: table.userRole, deny: ["VIEW_CHANNEL"] },
                { id: interaction.guild.id, deny: ["VIEW_CHANNEL"] }
            ]
        });
        await r.table("tickets").insert({ id: interaction.guild.id, guildissueEnabled: true, guildIssuesChannel: gissuesChannel.id }, {conflict: "update"}).run(client.con);

        let embedEnableButtonsguildissuesSuccess = new MessageEmbed()
            .setTitle("Enable guild issues")
            .setDescription("\`\`\`diff\n+ [✅] Successfully enabled\`\`\`")
            .setColor("GREEN")
        await interaction.reply({ embeds: [embedEnableButtonsguildissuesSuccess] })
    }
}