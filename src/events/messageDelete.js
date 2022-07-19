const { Collection } = require('discord.js');
module.exports = (client, message) => {
    if (message.author.bot) return;

    client.snipes.set(message.channel.id, {
        content: message.content,
        author: message.author.tag,
        avatarURL: message.author.avatarURL()
    })
};
