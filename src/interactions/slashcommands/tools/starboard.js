const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require("discord.js")
module.exports = {
    data: new SlashCommandBuilder()
        .setName("starboard")
        .setDescription("Starboard settings.")
        .addSubcommandGroup(subcommandGroup =>
            subcommandGroup
                .setName("settings")
                .setDescription("Starboard settings")
                .addSubcommand(subcommand =>
                    subcommand
                        .setName("channel")
                        .setDescription("Starboard channel")
                        .addChannelOption(channelOption =>
                            channelOption.setName("channel").setDescription("The bot on this channel will send notifications of new starboard messages").setRequired(true)
                        )
                )
                .addSubcommand(subcommand =>
                    subcommand
                        .setName("emoji")
                        .setDescription("Your custom starboard emoji")
                        .addStringOption(emoji => emoji.setName("emoji").setDescription("Type your emoji"))
                )
                .addSubcommand(subcommand =>
                    subcommand
                        .setName("count")
                        .setDescription("Emoji count (default: 3)")
                        .addNumberOption(count => count.setName("count").setDescription("Emoji count"))
                )
        ),
    async execute(client, interaction) {
        switch (interaction.options.getSubcommand()) {
            case "channel":
                for (let option of interaction.options.data[0].options) {
                    switch (option.name) {
                        case "channel":
                            const channel = await interaction.options.getChannel("channel")

                            await r.table("starboard").insert({ id: interaction.guild.id, starChannel: channel.id }, { conflict: "update" }).run(client.con);

                            const embed = new MessageEmbed()
                                .setDescription(`✅ Added starboard channel (<#${channel.id}>)`)
                                .setColor("BLURPLE")
                            await interaction.reply({ embeds: [embed] })
                            break;
                }}
                break;
            case "emoji":
                for (let option of interaction.options.data[0].options) {
                    switch (option.name) {
                        case "emoji":
                            const emoji = await interaction.options.getString("emoji")

                            await r.table("starboard").insert({ id: interaction.guild.id, starEmoji: emoji }, { conflict: "update" }).run(client.con);

                            const embed = new MessageEmbed()
                                .setDescription(`✅ Added custom emoji: ${emoji}`)
                                .setColor("BLURPLE")
                            await interaction.reply({ embeds: [embed] })
                            break;
                    }
                }
                break;
            case "count":
                for (let option of interaction.options.data[0].options) {
                    switch (option.name) {
                        case "count":
                            const count = await interaction.options.getNumber("count")

                            await r.table("starboard").insert({ id: interaction.guild.id, starCount: count }, { conflict: "update" }).run(client.con);

                            const embed = new MessageEmbed()
                                .setDescription(`✅ Added custom emoji count: ${count}`)
                                .setColor("BLURPLE")
                            await interaction.reply({ embeds: [embed] })
                            break;
                    }
                }
                break;
        }
    }
}