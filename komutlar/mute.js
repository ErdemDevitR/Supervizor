const Discord = require('discord.js');
const db = require('quick.db');
const veri = require('../veriler/veriler.json');
const ms = require('ms');
const moment = require('moment')
exports.config = {
    name:"mute",
    aliases:[]
}
module.exports.run = async(client,message,args)=> {
    const embed = new Discord.MessageEmbed().setColor('#2F3136')
    if(!message.member.roles.cache.has(veri.Roller["mute_staff"])&&!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(embed.setDescription(`Bu komutu kullanabilmek için <@&${veri.Roller["mute_staff"]}> rolüne sahip olman lazım`))
    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    const cezano = db.fetch(`ceza.${veri.sunucuid}`)+1;
    const sure = args[1]
    const sebeb = args.slice(2).join(" ")
    if(!member || !sure || !sebeb || !ms(sure)) return message.channel.send(embed.setDescription(`Yanlış kullanım. \nörn: .mute @erdem <1s(saniye)/1m(dakika)/1h(saat)/1d(gün)> küfür`))
    if(member.roles.cache.has(veri.Roller.muteli)) return message.channel.send('zaten muteli')
    message.channel.send(new Discord.MessageEmbed().setColor('#2F3136').setDescription(`Lütfen Bekleyin...`)).then(m => {
    const islem = {
        no:cezano,
        islem:"MUTE",
        tarih:Date.now(),
        bitis:Date.now()+ms(sure),
        member:member.user.id,
        sebep : sebeb,
        yetkili:message.member.user.id    
    };
    member.roles.add(veri.Roller["muteli"])
    db.add(`muteatan.${message.member.user.id}`,1)
    db.add(`muteyiyen.${member.user.id}`,1)
    db.push(`muteyedi.${member.user.id}`,member.user.id)
    db.add(`ceza.${veri.sunucuid}`,1)
    db.set(`cezacheck.${cezano}`,islem)
    let suree = sure.replace(`d`,` Gün`).replace(`h`,` Saat`).replace(`m`,` Dakika`).replace(`s`,` Saniye`)
    m.edit(new Discord.MessageEmbed().setColor('#2F3136').setDescription(`${member} Adlı kullanıcı \`${sebeb}\` yüzünden ${suree} boyunca susturuldu`).setFooter(`Ceza NO: #${cezano}`))})
    client.channels.cache.get(veri.Loglar['ceza_log']).send(new Discord.MessageEmbed().setColor('#2F3136').setFooter(`Ceza NO: #${cezano}`).setDescription(`Bir kullanıcı susturuldu;`).setAuthor(`Mute Islemi`).addField('Yetkili',message.member).addField('Kullanıcı',member).addField('Sure',sure).addField('Sebep',sebeb))
    setTimeout(function() {
        member.roles.remove(veri.Roller["muteli"])
        db.delete(`muteyedi.${member.user.id}`)
    },+ms(sure))
}