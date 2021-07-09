const Discord = require('discord.js')
const db = require('quick.db');
const veri = require('../veriler/veriler.json');
const ms = require('ms');
const moment = require('moment');
const { DiscordAPIError } = require('discord.js');
exports.config = {
    name:"git",
    aliases:['go']
}
module.exports.run = async(client,message,args)=> {
    const embed = new Discord.MessageEmbed().setColor('#2F3136')
    const U = "✅"
    const Y = "❌"
    const uye = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    if(!uye) return message.channel.send("Bir üye etiketlemelisin")
    if(!uye.voice.channel) return message.channel.send("Kullanıcı bir sesli kanala bağlı değil")
    if(message.member.voice.channelID == uye.voice.channelID) return message.channel.send("Zaten aynı kanaldasınız")
    const filter = (reactions,user) => {
        return [U,Y].includes(reactions.emoji.name) && user.id === uye.id
    }
    message.channel.send("<@!"+message.member+">, <@!"+uye+">",embed.setDescription(`${message.member} Adlı üye kanalınıza katılmak istiyor kabul ediyor musunuz`).setFooter(`20 Saniye içerisinde cevaplanmazsa iptal olacaktır.`)).then(M => {
        M.react(U)
        .then(a => M.react(Y))
        .then(s => M.awaitReactions(filter, {max:1, time:20000, errors:["time"]})
        .then(qwe => {
            const reaction = qwe.first();
            if(reaction.emoji.name=== U) {
                message.member.voice.setChannel(uye.voice.channelID)
                M.edit(embed.setDescription(`Başarıyla <#${uye.voice.channelID}> kanalına taşındınız`))
            }
            if(reaction.emoji.name=== Y) {
                M.edit(embed.setDescription(`Malesef 🙄, ${uye} Adlı kullanıcı kanala girmenizi istemiyor gibi gözüküyor`))
            }
        })
        )
        setTimeout(function() {
            M.delete();
            message.delete();
        },20000)
    })
}