const Discord = require('discord.js');
const db = require('quick.db');
const moment = require('moment');
const veri = require('../veriler/veriler.json')
exports.config = {
    name:"not",
    aliases:[]
}
module.exports.run = async(client,message,args) => {
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
    const embed = new Discord.MessageEmbed().setColor('#2F3136')
    if(message.author.id!=="758079799041196113") return message.channel.send(':x:')
    const notNo = args[0]
    const notno = db.get(`notcheck.${notNo}`)
    if(!notNo || !notno) return message.channel.send(veri.Emojiler["tag"]+" Bir not no girmelisin veya geçersiz girdin.")
    const not = notno.Not;
    const Tarih1 = notno.Tarih;
    const tarih = moment(Tarih1).format('DD') + " " + yeaherdem[moment(Tarih1).format('MM')] + " " + moment(Tarih1).format('YYYY HH:mm:ss')
    message.channel.send(embed.setDescription(`Merhaba Erdem,\n\n#${notNo} Numaralı notun işte detayları;`).addField(`Tarih`,tarih).addField(`Not`,`\`\`\`${not}\`\`\``))
}