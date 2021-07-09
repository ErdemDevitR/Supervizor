const Discord = require('discord.js');
const db = require('quick.db');
const veri = require('../veriler/veriler.json');
const ms = require('ms');
const moment = require('moment')
exports.config = {
    name:"ceza",
    aliases:[]
}
module.exports.run = async(client,message,args)=> {
    const embed = new Discord.MessageEmbed().setColor('#2F3136')
    if(!message.member.roles.cache.has(veri.Roller["ban"])&& !message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(embed.setDescription(`Bu komutu kullanabilmek için <@&${veri.Roller["ban"]}> rolüne sahip olman lazım`))
    const cezaNo = args[0]
    const cezano = db.get(`cezacheck.${cezaNo}`)
    if(!cezaNo || !cezano || isNaN(args[0])) return message.channel.send(embed.setDescription(`Yanlış kullanım veya geçersiz. örn: .ceza 10`))
    let yeaherdem = {
        "01": "Ocak",
        "02": "Şubat",
        "03": "Mart",
        "04": "Nisan",
        "05": "Mayıs",
        "06": "Haziran",
        "07": "Temmuz",
        "08": "Ağustos",
        "09": "Eylül",
        "10": "Ekim",
        "11": "Kasım",
        "12": "Aralık"
      };
    const no = cezaNo;
    const tarih1 = cezano.tarih;
    const islem = cezano.islem;
    const tarih2 = cezano.bitis;
    let reat = ""
    const memberr = cezano.member;
    const yetkili = cezano.yetkili;
    const sebep = cezano.sebep;
    const tarih = moment(tarih1).format('DD') +" "+ yeaherdem[moment(tarih1).format('MM')] + " " + moment(tarih1).format('YYYY HH:mm:ss')
    if(!tarih2) {
        if(tarih2 === undefined || tarih2 === null || tarih2 === NaN)
        reat = "BAN/UNBAN"
    } else {
        reat = moment(tarih2).format('DD') + " " + yeaherdem[moment(tarih2).format('MM')] + " "+ moment(tarih2).format('YYYY HH:mm:ss')
    }
    message.channel.send(embed.setDescription(`**#${no} Numaralı işlemin detayları aşağıda belirtilmiştir;`).setAuthor(message.guild.name).addField(`Ceza Türü`,islem).addField(`Sebebi`,sebep).addField(`Yetkili`,`<@!${yetkili}>`)
    .addField(`Cezalı`,`<@!${memberr}>`).addField(`Yapılan Tarih`,tarih).addField(`Bitiş Süresi`,reat).setFooter('Developed by ErdemDevitR'))
}