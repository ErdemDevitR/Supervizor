const Discord = require('discord.js')
const db = require('quick.db')
exports.config = {
    name:"pp",
    aliases:['avatar']
}
const ms = require('ms')
module.exports.run = async(client, message, args) => {
    let embed = new Discord.MessageEmbed().setColor('#2F3136')
    let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
    message.channel.send(embed.setDescription(`[Avatar Linki](${member.user.avatarURL({dynamic:true,size:1024})})`)
    .setImage(member.user.avatarURL({dynamic:true,size:1024}))
    .setAuthor(member.displayName)
    .setFooter(message.guild.name))
}
