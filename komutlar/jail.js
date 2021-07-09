const Discord = require('discord.js')
const db = require('quick.db');
const veri = require('../veriler/veriler.json');
const ms = require('ms');
const moment = require('moment');
const { DiscordAPIError } = require('discord.js');
exports.config = {
    name:"jail",
    aliases:[]
}
module.exports.run = async(client,message,args)=> {
    const embed = new Discord.MessageEmbed().setColor('#2F3136')
    if(!message.member.roles.cache.has(veri.Roller['jail_staff'])&&!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(embed.setDescription(`Bu komutu kullanabilmek için <@&${veri.Roller["jail_staff"]}> rolüne sahip olman lazım`))
    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    const sure = args[1]
    const cezano = db.fetch(`ceza.${veri.sunucuid}`)+1;
    const sebeb = args.slice(2).join(" ")
    if(!member || !sure || !sebeb || !ms(sure)) return message.channel.send(embed.setDescription(`Yanlış kullanım. \nörn: .jail @erdem <1s(saniye)/1m(dakika)/1h(saat)/1d(Gün)> sebep`))
    const suree = sure.replace(`m`,` Dakika`).replace('s',' Saniye').replace('d',' Gün').replace('h', ' Saat ')
    const islem = {
        no:cezano,
        islem:"JAIL",
        yetkili:message.member.user.id,
        member:member.user.id,
        tarih:Date.now(),
        bitis:Date.now()+ms(sure),
        sebep:sebeb
    };
    message.channel.send(embed.setDescription(`Lütfen bekleyin...`)).then(m => {
    member.roles.set(member.roles.cache.has(veri.Roller['booster']) ? [veri.Roller['cezalı'],veri.Roller['booster']] : [veri.Roller['cezalı']])
    db.add(`cezayiyen.${member.user.id}`,1)
    db.add(`cezaatan.${message.member.user.id}`,1)
    db.push(`cezayedi.${member.user.id}`,member.user.id)
    db.set(`cezacheck.${cezano}`,islem)
    db.add(`ceza.${veri.sunucuid}`,1)
    m.edit(embed.setDescription(`${member} Adlı kullanıcı \`${sebeb}\` Sebebinden dolayı ${suree} boyunca jaile atıldı`).setFooter(`Ceza NO: #${cezano}`))})
    client.channels.cache.get(veri.Loglar['ceza_log']).send(new Discord.MessageEmbed().setColor('#2F3136').setFooter(`Ceza NO: #${cezano}`).setAuthor(`Ceza Islemi`).addField('Yetkili',message.member).addField('Kullanıcı',member).addField('Sure',suree).addField('Sebep',sebeb))
    setTimeout(function() {
        db.delete(`cezayedi.${member.user.id}`)
        member.roles.set(member.roles.cache.has(veri.Roller.booster) ? [veri.Roller.booster,veri.Roller.kayıtsız] : [veri.Roller.kayıtsız])
        member.send(`**${message.guild.name}** Adlı sunucuda cezanız bitmiştir.`).catch();
    },+ms(sure))
}
