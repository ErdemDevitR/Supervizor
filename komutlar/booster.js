const Discord = require('discord.js')
const db = require('quick.db');
const veri = require('../veriler/veriler.json');
const ms = require('ms');
const moment = require('moment');
const { DiscordAPIError } = require('discord.js');
exports.config = {
    name:"booster",
    aliases:['b']
}
module.exports.run = async(client,message,args)=> {
    if(!message.member.roles.cache.has(veri.Roller.booster)) return message.channel.send(new Discord.MessageEmbed().setColor('#2F3136').setDescription(`Bu komutu kullanabilmek için sunucuya boost basmış olman lazım`))
    let isim = args.slice(0).join(" ")
    if(message.member.user.username.includes(veri.tag)) {
        message.member.setNickname(veri.tag+ " "+ isim)
    } else message.member.setNickname(veri.tagsız+ " "+isim)
    message.channel.send(new Discord.MessageEmbed().setColor('#2F3136').setDescription(`${message.member} Başarıyla nickin \`${veri.tagsız} ${isim}\` şeklinde değiştirldi,\n`+
    `${veri.Emojiler.tag} Yeni nickin ile havana hava kat!`).setThumbnail(message.guild.iconURL({dynamic:true})).setFooter('DevitR Was Here!').setTimestamp())
}