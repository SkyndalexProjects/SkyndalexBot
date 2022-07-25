const {MessageActionRow, MessageButton, MessageEmbed} = require("discord.js");
module.exports = async (client, reaction) => {
    if (reaction.me) return;
    if (reaction.message.partial) await reaction.message.fetch();
    console.log(reaction)

    const db = await r.table("starboard").get(reaction.message.guildId).run(client.con);

    const guild = reaction.message.guildId
    const channel = reaction.message.channelId
    const message = reaction.message.id

    if (reaction.emoji.name === "⭐" || db.starEmoji) { // TODO: if (reaction.emoji.count
        const row = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setStyle("LINK")
                    .setLabel("Jump!")
                    .setURL(`https://discord.com/channels/${guild}/${channel}/${message}`)

            );

            const embed = new MessageEmbed()
                .setColor("BLURPLE")
                .setDescription(`> ⭐ ${reaction.message.content}`)
                .addField(`Channel`, `<#${channel}> (${channel})`)
                .setFooter({ text: `${reaction.message.author.id} || ${reaction.message.author.username}#${reaction.message.author.discriminator}`})
            await client.channels.cache.get(db.starChannel).send({ embeds: [embed], components: [row] })
    }
    // TODO: reaction update check
}