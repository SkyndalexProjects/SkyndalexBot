const { SlashCommandBuilder } = require('@discordjs/builders');
const axios = require("axios");
const { fetch } = require("undici");

const {MessageEmbed, Modal, MessageActionRow, MessageButton, TextInputComponent} = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("trello")
        .setDescription("Trello manager")
        .addSubcommand(subcommand =>
            subcommand
                .setName("auth")
                .setDescription("Trello account authentication")
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName("options")
                .setDescription("Trello settings")
                .addStringOption(option => option.setName("add").setDescription("Add options")
                    .addChoices(
                        { name: 'Add card', value: 'addCard' },
                        { name: 'Add attachment to card', value: 'addAttachToCard' },
                        { name: 'Add board', value: 'addBoard' },
                        { name: 'Add checklist to card', value: 'addChecklistToCard' },
                        { name: 'Add comment to card', value: 'addCommentToCard' },
                        { name: 'Add item to checklist', value: 'addItemToChecklist' },
                        { name: 'Add label on board', value: 'addLabelOnBoard' },
                        { name: 'Add label to card', value: 'addLabelToCard' },
                        { name: 'Add list to board', value: 'addListToBoard' },
                        { name: 'Add member to board', value: 'addMemberToBoard' },
                        { name: 'Add member to card', value: 'addMemberToCard' },
                        { name: 'Add sticker to card', value: 'addStickerToCard' },
                        { name: 'Add webhook', value: 'addWebhook' },
                    )
                )
                .addStringOption(option => option.setName("update").setDescription("Update options")
                    .addChoices(
                        { name: "updateCard", value: "update_card" },
                        { name: "Update board", value: "update_board" },
                        { name: "Update membership of member on board", value: "update_membership_of_member_on_board" },
                        { name: "Update checkitem on card", value: "update_checkitem_on_card" },
                        { name: "Update sticker on card", value: "update_sticker_on_card" },
                        { name: "Update checkitem on checklist on card", value: "update_checkitem_on_checklist_on_card" }
                    )
                )
                .addStringOption(option => option.setName("get").setDescription("Get data about your trello settings")
                    .addChoices(
                        { name: "Get lists", value: "getListIDs" },
                        { name: "Get cards", value: "getCardIDs" },
                        { name: "Get board organization", value: "getOrgID" },
                        { name: "Get checklist", value: "getChecklists"},
                        { name: "Get boards", value: "getBoardIDs" },
                    )
                )
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName("set")
                .setDescription("Your trello guild settings")
                .addStringOption(option =>
                    option
                        .setName("suggestionslistid")
                        .setDescription("User suggestions list ID")
                )
                .addStringOption(option =>
                    option
                        .setName("suggestionschecklistid")
                        .setDescription("User suggestions checklist ID")
                )
                .addStringOption(option =>
                    option
                        .setName("appeallistid")
                        .setDescription("User appeal list ID")
                )
                .addStringOption(option =>
                    option
                        .setName("appealchecklistid")
                        .setDescription("User appeal checklist ID.")
                )
                .addStringOption(option =>
                    option
                        .setName("issuelistid")
                        .setDescription("User issues list ID")
                )
                .addStringOption(option =>
                    option
                        .setName("issueschecklistid")
                        .setDescription("User issues checklist ID.")
                )
                .addStringOption(option =>
                    option
                        .setName("complaintlistid")
                        .setDescription("User complaints list ID")
                )
                .addStringOption(option =>
                    option
                        .setName("complaintchecklistid")
                        .setDescription("User complaints checklist ID.")
                )
        ),
    async execute(client, interaction) {
        switch (interaction.options.getSubcommand()) {
            case "auth":
                const {authURL} = require("../../../config.json").discord

                const row = new MessageActionRow()
                    .addComponents(
                        new MessageButton()
                            .setStyle("LINK")
                            .setLabel("Authorize here")
                            .setURL(authURL)
                    );

                let authInfo = new MessageEmbed()
                    .setDescription(`To continue, you must authorize your trello and discord account. I need access to your board information`)
                    .setColor("BLURPLE")
                await interaction.reply({embeds: [authInfo], components: [row]});
                break;
            case "options":
                const add = await interaction.options.getString("add");
                const get = interaction.options.getString("get")

                if (add) return require(`../../subcommands/trellomanager/add/${add}`)(client, interaction);
                if (get) return require(`../../subcommands/trellomanager/get/${get}`)(client, interaction);
                break;
            case "set":
                for (let option of interaction.options.data[0].options) {
                    switch (option.name) {
                        case "suggestionslistid":
                            if (interaction.options.getString("suggestionslistid")) require("../../select menus/tickets/addToTrello")(client, interaction)
                            break;
                        case "suggestionschecklistid":
                            if (interaction.options.getString("suggestionschecklistid")) require("../../subcommands/tickets/trelloActions/checklists/addSuggestionToChecklist.js")(client, interaction)
                            break;
                    }
                }
                break;
        }
    }
}