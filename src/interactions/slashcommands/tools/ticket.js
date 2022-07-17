const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js")
module.exports = {
    data: new SlashCommandBuilder()
        .setName("tickets")
        .setDescription("Tickets menu")
        .addSubcommand(subcommand =>
            subcommand
                .setName("enable")
                .setDescription("Enable tickets"))
        .addSubcommand(subcommand =>
            subcommand
                .setName("disable")
                .setDescription("Disable tickets"))
        .addSubcommand(subcommand =>
            subcommand
                .setName("send")
                .setDescription("send ticket"))
        .addSubcommand(subcommand =>
            subcommand
                .setName("add")
                .setDescription("Add user to ticket")
                .addUserOption(option => option.setName("target").setDescription("Target user")))
        .addSubcommand(subcommand =>
            subcommand
                .setName("remove")
                .setDescription("Remove user from ticket")
                .addUserOption(option => option.setName("target").setDescription("Target user")))
        .addSubcommand(subcommand =>
            subcommand
                .setName("catdelete")
                .setDescription("Delete last 100 channels from specified category.")
                .addStringOption(option => option.setName("categoryid").setDescription("Category ID").setRequired(true)),
        ),

    async execute(client, interaction) {
        switch (interaction.options.getSubcommand()) {
            case "add":
                let u = interaction.options.getMember("member")

                await interaction.channel.permissionOverwrites.create(u.id, { VIEW_CHANNEL: true, SEND_MESSAGES: true })

                await interaction.reply(`<@${u.id}>,`)

                let permsembed = new MessageEmbed()
                    .setDescription(`Successfully added member <@${u.id}> to channel <#${interaction.channel.id}>.`)
                    .setColor("GREEN")
                await interaction.channel.send({ embeds: [permsembed] })
                break;
            case "remove":
                let u_remove = interaction.options.getMember("member")

                await interaction.channel.permissionOverwrites.create(u_remove.id, { VIEW_CHANNEL: false, SEND_MESSAGES: false })

                let permsembed2 = new MessageEmbed()
                    .setDescription(`Successfully removed member <@${u_remove.id}> from channel <#${interaction.channel.id}>.`)
                    .setColor("RED")
                await interaction.channel.send({ embeds: [permsembed2] })
                break;
            case "catdelete":
                const category = interaction.options.getString("categoryid");

                const del = await interaction.guild.channels.cache.get(category)
                await del.children.forEach(channel => channel.delete())

                const channelList = []

                for (let i in del.guild) {
                    channelList.push(del.guild[i].name)
                };

                await interaction.reply(`Deleted \`${del.id.length}\` channels.\n\n\`\`\`${channelList.join(",\n")}\`\`\``)
                break;
            case "enable":
                let custom = await r.table("customizationSystem").get(interaction.guild.id).run(client.con);

                const buttonsEnable = new MessageActionRow()
                    .addComponents(
                        new MessageButton()
                            .setStyle("SUCCESS")
                            .setLabel("Complaints")
                            .setCustomId("enable_complaints"),
                        new MessageButton()
                            .setStyle("SUCCESS")
                            .setLabel("Suggestions")
                            .setCustomId("enable_suggestions"),
                        new MessageButton()
                            .setStyle("SUCCESS")
                            .setLabel("Asking mods")
                            .setCustomId("enable_askmod"),
                        new MessageButton()
                            .setStyle("SUCCESS")
                            .setLabel("Guild issues")
                            .setCustomId("enable_gissues"),
                        new MessageButton()
                            .setStyle("SUCCESS")
                            .setLabel("Appeal")
                            .setCustomId("enable_appeal"),
                    );
                const buttonsEnable2 = new MessageActionRow()
                    .addComponents(
                        new MessageButton()
                            .setStyle("SUCCESS")
                            .setLabel("Archive")
                            .setCustomId("enable_archive"),
                    );

                let embedEnableButtons = new MessageEmbed()
                    .setTitle("Enable tickets")
                    .setDescription(client.strings.tickets.CATEGORY_ENABLE)
                    .setColor("GREEN")
                return interaction.reply({ embeds: [embedEnableButtons], components: [buttonsEnable, buttonsEnable2] })
                break;
            case "disable":
                const buttonsDisable = new MessageActionRow()
                    .addComponents(
                        new MessageButton()
                            .setStyle("DANGER")
                            .setLabel("Complaints")
                            .setCustomId("disable_complaints"),
                        new MessageButton()
                            .setStyle("DANGER")
                            .setLabel("Suggestions")
                            .setCustomId("disable_suggestions"),
                        new MessageButton()
                            .setStyle("DANGER")
                            .setLabel("Asking mods")
                            .setCustomId("disable_askmod"),
                        new MessageButton()
                            .setStyle("DANGER")
                            .setLabel("Guild issues")
                            .setCustomId("disable_gissues"),
                        new MessageButton()
                            .setStyle("DANGER")
                            .setLabel("Appeal")
                            .setCustomId("disable_appeal"),
                    );

                let embedDisableButtons = new MessageEmbed()
                    .setTitle("Disable tickets")
                    .setDescription(client.strings.tickets.CATEGORY_DISABLE)
                    .setColor("RED")
                return interaction.reply({ embeds: [embedDisableButtons], components: [buttonsDisable] })
                break;
            case "send":
                const buttonsTickets = new MessageActionRow()
                    .addComponents(
                        new MessageButton()
                            .setCustomId("send_complaints")
                            .setLabel("Complaints")
                            .setStyle("SUCCESS"),
                        new MessageButton()
                            .setCustomId("send_suggestions")
                            .setLabel("Suggestions")
                            .setStyle("SUCCESS"),
                        new MessageButton()
                            .setCustomId("send_mod_questions")
                            .setLabel("Mod questions")
                            .setStyle("SUCCESS"),
                        new MessageButton()
                            .setCustomId("send_issues")
                            .setLabel("Guild issue")
                            .setStyle("SUCCESS"),
                        new MessageButton()
                            .setCustomId("send_appeal")
                            .setLabel("Appeal")
                            .setStyle("SUCCESS")
                    );
                let embedTickets = new MessageEmbed()
                    .setTitle("Send ticket to specified category")
                    .setDescription(client.strings.tickets.CATEGORY_CHOOSE)
                    .setColor("BLUE")
                return interaction.reply({
                    embeds: [embedTickets],
                    components: [buttonsTickets]
                })
                break;
        }
    },
};
