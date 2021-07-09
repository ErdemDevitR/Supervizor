const db = require('quick.db');
const veri = require('../veriler/veriler.json');
const ms = require('ms');
const moment = require('moment');
const Discord = require('discord.js');
const { ansi } = require('chalk');
exports.config = {
    name:"unban",
    aliases:[]
}
module.exports.run = async(client,message,args)=> {
    const embed = new Discord.MessageEmbed().setColor('#2F3136')
    if(!message.member.roles.cache.has(veri.Roller['ban'])&&!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(embed.setDescription(`Bu komutu kullanabilmek için <@&${veri.Roller["jail_staff"]}> rolüne sahip olman lazım`))
    const member = message.mentions.members.first() || args[0]
    const cezano = db.fetch(`ceza.${veri.sunucuid}`)+1;
    if(!member) return message.channel.send(embed.setDescription(`Bir üye etiketlemelisin`))
    message.guild.members.unban(member).catch(error => {
        message.channel.send("Üye bulunamadı veya yasaklı değil. \n"+error)
    return});
    const islem = {
        no:cezano,
        islem:"UNBAN",
        yetkili:message.member.user.id,
        member:member,
        tarih:Date.now(),
        sebep:"AF"
    }
    db.add(`unbanyiyen.${member}`,1)
    db.add(`unbanatan.${message.member.user.id}`,1)
    db.add(`ceza.${veri.sunucuid}`,1)
    db.set(`cezacheck.${cezano}`,islem)
    message.channel.send(embed.setDescription(`${client.emojis.cache.find(a => a.name==="onay")} <@${member}> Adlı kullanıcının yasağı başarıyla kaldırıldı.`).setFooter(`Ceza NO: #${cezano}`))
}