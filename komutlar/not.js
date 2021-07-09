const Discord = require('discord.js');
const db = require('quick.db');
const moment = require('moment');
const veri = require('../veriler/veriler.json')
exports.config = {
    name:"not-al",
    aliases:['notal']
}
module.exports.run = async(client,message,args) => {
    const embed = new Discord.MessageEmbed().setColor('#2F3136')
    if(message.author.id!=="758079799041196113") return message.channel.send(':x:')
    const notno = db.fetch(`notno.${veri.sunucuid}`)+1;
    const not = args.slice(0).join(" ")
    if(!not) return message.channel.send("Bir not girmelisin")
    let Not = {
        No:notno,
        Not:not,
        Tarih:Date.now()
    }
    db.push(`not.${veri.sunucuid}`,not)
    db.set(`notcheck.${notno}`,Not)
    db.add(`notno.${veri.sunucuid}`,1)
    message.channel.send(`${veri.Emojiler["tag"]} __Başarı__yla notunuzu kaydettim #${notno}`)
}