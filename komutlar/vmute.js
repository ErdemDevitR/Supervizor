const { MessageEmbed }= require('discord.js');
const db = require('quick.db');
const veri = require('../veriler/veriler.json');
const ms = require('ms');
const moment = require('moment')
exports.config = {
    name:"vmute",
    aliases:[]
}
module.exports.run = async(client,message,args)=> {
    if(!message.member.roles.cache.has(veri.Roller.mute_staff) || !message.member.hasPermission('ADMINISTRATOR')) {return message.channel.send(new MessageEmbed().setColor('#2F3136')
    .setDescription(`Bu komutu kullanabilmek için <@&${veri.Roller.mute_staff}> rolüne sahip olmalısın`).setTimestamp())
    .then(message.delete(), m => m.delete({timeout:3000}))}
    let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    let cezano = db.fetch(`ceza.${veri.sunucuid}`)+1;
    let sure = args[1]
    let sebep = args.slice(2).join(" ")
    if(!member || !sure || !sebep || !ms(sure)) {return message.channel.send(new MessageEmbed().setColor('#2F3136')
    .setDescription(`Yanlış kullanım! örn: ".vmute @erdem <1s (saniye),1m (dakika),1h (saat),1d (gün),1w (hafta)> küfür" şeklinde olmak zorundadır`))
    .then(message.delete(), m => m.delete({timeout:3000}))}
    if(member.roles.cache.has(veri.Roller.vmuteli)) return message.channel.send('Kullanıcı zaten muteli').then(message.delete(), m => m.delete({timeout:3000}))
    message.channel.send(new MessageEmbed().setColor('#2F3136').setDescription(`Lütfen bekleyin...`)).then(m => {
        const islem = {
            no:cezano,
            islem:"VOICE MUTE",
            tarih:Date.now(),
            bitis:Date.now()+ms(sure),
            member:member.user.id,
            sebep : sebeb,
            yetkili:message.member.user.id    
        };
        db.add(`vmuteatan.${message.member.user.id}`,1)
        db.add(`vmuteyiyen.${member.user.id}`,1)
        db.push(`vmuteyedi.${member.user.id}`,member.user.id)
        db.add(`ceza.${veri.sunucuid}`,1)
        db.set(`cezacheck.${cezano}`,islem)
        let suree = sure.replace(`s`, ` Saniye`).replace(`m`, ` Dakika`).replace(`h`, ` Saat`).replace(`d`, ` Gün`).replace(`w`, ` Hafta`)
        m.edit(new MessageEmbed().setDescription(`Başarıyla ${member} Adlı kullanıcı ${suree} boyunca mute atıldı`).setFooter(`Ceza NO: #${cezano}`))
        client.channels.cache.get(veri.Loglar['ceza_log']).send(new Discord.MessageEmbed().setColor('#2F3136').setFooter(`Ceza NO: #${cezano}`).setDescription(`Bir kullanıcı susturuldu;`).setAuthor(`Voice Mute Islemi`).addField('Yetkili',message.member).addField('Kullanıcı',member).addField('Sure',suree).addField('Sebep',sebeb))
    })
    setTimeout(function() {
        member.roles.remove(veri.Roller.vmuteli)
        db.delete(`vmuteyedi.${member.user.id}`)
    },+ms(sure))
}