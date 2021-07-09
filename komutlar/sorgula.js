const Discord = require('discord.js')
const db = require('quick.db')
const veri = require('../veriler/veriler.json')
const ms = require('ms')
exports.config = {
    name:"sorgula",
    aliases:['sicil']
}
module.exports.run = async(client, message, args) => {
    let embed = new Discord.MessageEmbed().setColor('#2F3136')
    let guild = message.guild;
    let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
    let mute = db.fetch(`muteyiyen.${member.user.id}`) || 0
    let ymute = db.fetch(`muteatan.${member.user.id}`) || 0
    let vmute = db.fetch(`vmuteyiyen.${member.user.id}`) || 0
    let yvmute = db.fetch(`vmuteatan.${member.user.id}`) || 0
    let jail = db.fetch(`cezayiyen.${member.user.id}`) || 0
    let yjail = db.fetch(`cezaatan.${member.user.id}`) || 0
    let ban = db.fetch(`banyiyen.${member.user.id}`) || 0
    let yban = db.fetch(`banatan.${member.user.id}`) || 0
    let unban = db.fetch(`unbanyiyen.${member.user.id}`) || 0
    let yunban = db.fetch(`unbanatan.${member.user.id}`) || 0
    let eteyit = db.fetch(`eteyit.${member.user.id}`) || 0
    let kteyit = db.fetch(`kteyit.${member.user.id}`) || 0
    let toplamteyit = eteyit + kteyit
    let guven = mute + vmute + jail + ban
    var guvenfaktoru;
    if(guven = 0) guvenfaktoru = veri.Emojiler.tik +` Güvenli!`
    if(guven > 5) guvenfaktoru = veri.Emojiler.tik +` Yeni Suçlu!`
    if(guven > 10) guvenfaktoru = veri.Emojiler.hata +` Tehlikeli!`
    message.channel.send(embed.setThumbnail(member.user.avatarURL({dynamic:true})).setDescription(`${member} Adlı kullanıcının güven faktörü;\n${guvenfaktoru}\n\n${member} Adlı kullanıcının kaydedilen tüm veri kayıdları aşşağıda belirtilmiştir;\n\n`+
    `${veri.tagsız} Toplam Yediği Mute: \`${mute}\`\n`+
    `${veri.tagsız} Toplam Attığı Mute: \`${ymute}\`\n`+
    `${veri.tagsız} Toplam Yediği VMute: \`${vmute}\`\n`+
    `${veri.tagsız} Toplam Attığı VMute: \`${yvmute}\`\n`+
    `${veri.tagsız} Toplam Yediği Jail: \`${jail}\`\n`+
    `${veri.tagsız} Toplam Attığı Jail: \`${yjail}\`\n`+
    `${veri.tagsız} Toplam Yediği Ban: \`${ban}\`\n`+
    `${veri.tagsız} Toplam Attığı Ban: \`${yban}\`\n`+
    `${veri.tagsız} Toplam Yediği UNBan: \`${unban}\`\n`+
    `${veri.tagsız} Toplam Attığı UNBan: \`${yunban}\`\n`+
    `${veri.tagsız} Toplam Erkek Teyiti: \`${eteyit}\`\n`+
    `${veri.tagsız} Toplam Kadın Teyiti: \`${kteyit}\`\n`+
    `${veri.tagsız} Toplam Teyiti: \`${toplamteyit}\``).setFooter(guild.name,client.user.avatarURL({dynamic:true})).setAuthor(`Sicil`,member.user.avatarURL({dynamic:true})))
}
