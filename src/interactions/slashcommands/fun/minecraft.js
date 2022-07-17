const { SlashCommandBuilder } = require('@discordjs/builders');
const { fetch } = require("undici")
const {MessageEmbed} = require("discord.js");
module.exports = {
    data: new SlashCommandBuilder()
        .setName("minecraft")
        .setDescription("Get minecraft server info")
        .addStringOption(player => player.setName("ip").setDescription("IP address").setRequired(true)),

    async execute(client, interaction) {
        const data = await fetch(`https://api.mcsrvstat.us/2/${interaction.options.getString("ip")}`)

        const json = await data.json()

        const status = {
            true: "<:online:996770091641352202>",
            false: "<:offline:978053147312406568>"
        };

        let embed = new MessageEmbed()
            .setTitle(`Viewing info: ${json.hostname} (${status[json.online]})`)
            .setDescription(`\`\`\`IP: ${json.ip}\nPort: ${json.port}\nHostname: ${json.hostname}\nProtocol: ${json.protocol}\nVersion: ${json.version}\nOnline players: ${json.players.online}/${json.players.max}\`\`\``)
            .setColor("BLURPLE")
        await interaction.reply({ embeds: [embed] })
    }
}