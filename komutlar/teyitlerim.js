const Discord = require('discord.js')
const db = require('quick.db')
exports.config = {
    name:"teyit",
    aliases:['teyitlerim']
}
module.exports.run = async(client, message, args) => {
    let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
    let erkekteyit = db.fetch(`eteyit.${member.user.id}`)
    let kadınteyit = db.fetch(`kteyit.${member.user.id}`)
    let et = ""
    let kt = ""
    if(!erkekteyit) {
        if(erkekteyit === null || erkekteyit === undefined || erkekteyit === NaN)
        et = 0
    } else {
        et = erkekteyit
    }
    if(!kadınteyit) {
        if(kadınteyit === null || kadınteyit === undefined || kadınteyit === NaN)
        kt = 0
    } else {
        kt = kadınteyit
    }
    let toplam = et + kt
    message.channel.send(`Toplam bulunan erkek teyitin: \`${et}\`\nToplam bulunan kadın teyitin: \`${kt}\`\nToplam teyitin: \`${toplam}\``)
}
