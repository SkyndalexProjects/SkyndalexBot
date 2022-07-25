const { Collection } = require('discord.js');
module.exports = (client, message) => {
    client.snipes.set(message.channel.id, {
        content: message.content,
        author: message.author.tag,
        avatarURL: message.author.avatarURL()
    })
};
