const { MessageActionRow, MessageSelectMenu, MessageEmbed} = require("discord.js")
const { SlashCommandBuilder } = require('@discordjs/builders');
module.exports = {
    data: new SlashCommandBuilder()
        .setName("set")
        .setDescription("Settings"),
    async execute(client, interaction) {
        const channels = new MessageActionRow()
            .addComponents(
                new MessageSelectMenu()
                    .setCustomId("channels_settings")
                    .setPlaceholder("Channels settings")
                    .addOptions([
                        { label: `📣 Broadcasts`, description: "Broadcast channel", value: "broadcast_channel"},
                        { label: `💡 Suggestions`, description: "Suggestions channel", value: "suggestions_channel"},
                        { label: `🚫 Complaints`, description: "Complaints channel", value: "complaints_channel"},
                        { label: `🖼️ Images`, description: "Images channel", value: "images_channel"},
                        { label: `👋  Welcomes`, description: "Suggestions channel", value: "welcome_channel"},
                        { label: `✈️ ModLog`, description: "ModLog channel", value: "modlog_channel"},
                        { label: `🫰  Goodbyes`, description: "Goodbyes channel", value: "goodbye_channel"},
                    ])
            );

        const roles = new MessageActionRow()
            .addComponents(
                new MessageSelectMenu()
                    .setCustomId("roles_settings")
                    .setPlaceholder("Roles settings")
                    .addOptions([
                        { label: `🔨 Moderator`, description: "Moderator role", value: "moderator_role"},
                        { label: `🔐 Muted`, description: "Muted role", value: "muted_role"},
                        { label: `🙋 User`, description: "User role", value: "user_role"},
                        { label: `🤖 Automatic`, description: "Automatic role", value: "automatic_role"},
                    ])
            );

        const embed = new MessageEmbed()
            .setDescription("Please choose option from select menus.")
            .setColor("DARK_BLUE")
        await interaction.reply({ embeds: [embed], components: [channels, roles] })


    }
}