const {MessageEmbed} = require("discord.js");
module.exports = async (client, interaction) => {
    if (interaction.customId === "enable_askmod") {
        let table = await r.table("settings").get(interaction.guild.id).run(client.con);

        if (!table?.userRole) return interaction.reply({ content: "\`userRole\` not found in server settings! Please configure it with \`/set\` command.",  ephemeral: true });

        let askmodChannel = await interaction.guild.channels.create("Mod questions", {
            type: "GUILD_CATEGORY",
            permissionOverwrites: [
                { id: table.moderatorRole, allow: ["VIEW_CHANNEL", "SEND_MESSAGES"] },
                { id: table.userRole, deny: ["VIEW_CHANNEL"] },
                { id: interaction.guild.id, deny: ["VIEW_CHANNEL"] }
            ]
        });
        await r.table("tickets").insert({ id: interaction.guild.id, askmodEnabled: true, askmodChannel: askmodChannel.id }, { conflict: "update" }).run(client.con)

        let embedEnableButtonsaskmodsSuccess = new MessageEmbed()
            .setTitle("Enable asking mods")
            .setDescription("\`\`\`diff\n+ [✅] Successfully enabled\`\`\`")
            .setColor("GREEN")
        await interaction.reply({ embeds: [embedEnableButtonsaskmodsSuccess] })
    }
}