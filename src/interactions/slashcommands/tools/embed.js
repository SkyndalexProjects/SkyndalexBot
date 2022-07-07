const { SlashCommandBuilder } = require('@discordjs/builders');
const { Modal, TextInputComponent, MessageActionRow, MessageEmbed, MessageSelectMenu, MessageButton} = require("discord.js");
module.exports = {
    data: new SlashCommandBuilder()
        .setName("embed")
        .setDescription("Embed creator"),
    async execute(client, interaction) {
        const channelOptions = new MessageActionRow()
            .addComponents(
                new MessageSelectMenu()
                    .setCustomId("embed_settings")
                    .setPlaceholder("Choose embed settings")
                    .addOptions([
                        { label: `⚙️ General`, description: "Title, description etc.", value: `general_selectmenu_embed_option` },
                        { label: `🖼️ Images`, description: "All embed images", value: "image_selectmenu_embed_option" },
                    ])
            );
        const fieldAdd = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setCustomId("embed_add_field")
                    .setLabel("Add field")
                    .setStyle("SUCCESS")
            )

        const embed = new MessageEmbed()
            .setTitle(`ExampleLayout`)
        await interaction.reply({ embeds: [embed], components: [channelOptions, fieldAdd ]})
    }
}