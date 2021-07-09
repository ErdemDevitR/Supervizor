const db = require('quick.db');
const Discord = require('discord.js');
const veri = require('../veriler/veriler.json');
const ms = require('ms');
const moment = require('moment');
const { DiscordAPIError } = require('discord.js');
exports.config = {
    name:"ban",
    aliases:[]
}
module.exports.run = async(client,message,args)=> {
    const embed = new Discord.MessageEmbed().setColor('#2F3136')
    if(!message.member.roles.cache.has(veri.Roller['ban'])&&!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(embed.setDescription(`Bu komutu kullanabilmek için <@&${veri.Roller["jail_staff"]}> rolüne sahip olman lazım`))
    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || args[0]
    const sebeb = args.slice(1).join(" ")
    const cezano = db.fetch(`ceza.${veri.sunucuid}`)+1;
    if(!member || !sebeb) return message.channel.send(embed.setDescription(`Yanlış kullanım. örn: .ban @erdem/ID reklam `))
    message.guild.members.ban(member.id,{reason:sebeb}).catch(error => {
        message.channel.send(`Belirttiğiniz ID de kullanıcı bulunamadı\n${error}`)
        return})
        let islem = {
            no:cezano,
            yetkili:message.member.user.id,
            member:member.user.id,
            sebep:sebeb,
            tarih:Date.now(),
            islem:"BAN"
        }
        db.add(`banyiyen.${member.user.id}`,1)
        db.add(`banatan.${message.member.user.id}`,1)
        db.add(`ceza.${veri.sunucuid}`,1)
        db.set(`cezacheck.${cezano}`,islem)
        message.channel.send(embed.setDescription(`${member} Adlı kullanıcı \`${sebeb}\` Sebebinden dolayı sunucudan yasaklandı!`).setFooter(`Ceza NO: #${cezano}`))
        client.channels.cache.get(veri.Loglar['ceza_log']).send(embed.setAuthor(`Yasaklanma Islemi`).addField('Yetkili',message.member).addField('Kullanıcı',member).addField('Sebep',sebeb))
}