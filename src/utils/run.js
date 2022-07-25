module.exports = async(client, interaction) => {    
    await require("../../src/interactions/select menus/settings/broadcast-channel.js")(client, interaction)
    await require("../../src/interactions/select menus/settings/complaints-channel.js")(client, interaction)
    await require("../../src/interactions/select menus/settings/goodbye-channel.js")(client, interaction)
    await require("../../src/interactions/select menus/settings/images-channel.js")(client, interaction)
    await require("../../src/interactions/select menus/settings/modlog-channel.js")(client, interaction)
    await require("../../src/interactions/select menus/settings/suggestions-channel.js")(client, interaction)
    await require("../../src/interactions/select menus/settings/welcome-channel.js")(client, interaction)
    await require("../../src/interactions/select menus/settings/auto-role.js")(client, interaction)
    await require("../../src/interactions/select menus/settings/moderator-role.js")(client, interaction)
    await require("../../src/interactions/select menus/settings/muted-role.js")(client, interaction)
    await require("../../src/interactions/select menus/settings/user-role.js")(client, interaction)

    await require("../../src/interactions/select menus/embed builders/embed.js")(client, interaction)

    await require("../interactions/buttons/tickets/archive/archiveAppeal.js")(client, interaction)
    await require("../interactions/buttons/tickets/archive/archiveAskmod.js")(client, interaction)
    await require("../interactions/buttons/tickets/archive/archiveComplaint.js")(client, interaction)
    await require("../interactions/buttons/tickets/archive/archiveQuestion.js")(client, interaction)
    await require("../interactions/buttons/tickets/archive/archiveGuildIssue.js")(client, interaction)

    await require("../interactions/buttons/tickets/disable/disableAppeal")(client, interaction)
    await require("../interactions/buttons/tickets/disable/disableAskmod")(client, interaction)
    await require("../interactions/buttons/tickets/disable/disableComplaints")(client, interaction)
    await require("../interactions/buttons/tickets/disable/disableGuildIssues")(client, interaction)

    await require("../interactions/buttons/tickets/enable/enableAppeals")(client, interaction)
    await require("../interactions/buttons/tickets/enable/enableArchive")(client, interaction)
    await require("../interactions/buttons/tickets/enable/enableAskmod")(client, interaction)
    await require("../interactions/buttons/tickets/enable/enableComplaints")(client, interaction)
    await require("../interactions/buttons/tickets/enable/enableGuildIssues")(client, interaction)
    await require("../interactions/buttons/tickets/enable/enableSuggestions")(client, interaction)

    await require("../interactions/buttons/tickets/send/sendComplaints")(client, interaction)
    await require("../interactions/buttons/tickets/send/sendSuggestions")(client, interaction)
    await require("../interactions/buttons/tickets/send/sendIssue")(client, interaction)
    await require("../interactions/buttons/tickets/send/sendAppeal")(client, interaction)
    await require("../interactions/buttons/tickets/send/sendQuestion")(client, interaction)

    await require("../interactions/buttons/tickets/actions/addToTrello.js")(client, interaction)
}