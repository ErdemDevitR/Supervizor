const Discord = require('discord.js')
const db = require('quick.db')
const veri = require('../veriler/veriler.json')
const ms = require('ms')
exports.config = {
    name:"say",
    aliases:['ses']
}
module.exports.run = async(client, message, args) => {
    const voiceChannels = message.guild.channels.cache.filter(c => c.type==="voice")
    let count= 0
    for (const [id, voiceChannel] of voiceChannels)
    count+= voiceChannel.members.size
    let embed = new Discord.MessageEmbed().setColor('#2F3136')
    .setAuthor(message.guild.name)
    .setDescription(`${veri.tagsız} Sunucuda toplam **${client.guilds.cache.reduce((a, b) => a + b.memberCount, 0).toLocaleString()}** Kişi Bulunmakta\n`+
    `${veri.tagsız} Sunucuda sesde toplam **${count}** kişi bulunmakta\n`+
    `${veri.tagsız} Sunucu tagında **${message.guild.members.cache.filter(m => m.user.username.includes(veri.tag)).size}** kişi bulunmakta`)
    message.channel.send(embed)
}
