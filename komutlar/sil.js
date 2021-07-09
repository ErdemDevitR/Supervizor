const Discord = require('discord.js');
const db = require('quick.db');
const veri = require('../veriler/veriler.json');
const ms = require('ms');
const moment = require('moment')
exports.config = {
    name:"sil",
    aliases:['temizle']
}
module.exports.run = async(client,message,args)=> {
    const embed = new Discord.MessageEmbed().setColor('#2F3136')
    if(!message.member.roles.cache.has(veri.Roller["room_staff"]) && !message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(embed.setDescription(`Bu komutu kullanabilmek için <@&${veri.Roller["room_staff"]}> rolüne sahip olmalısın`))
    const miktar = args[0]
    if(!miktar) return message.channel.send(`Bir miktar belirtmelisin`)
    if(!Number(miktar)) return message.channel.send(`Bir rakam olmalı`)
    if(miktar > 100) return message.channel.send(`Maximum 100 olmak zorunda`)
    message.channel.bulkDelete(miktar).catch(error => message.channel.send(error))
    message.channel.send(`${veri.Emojiler["tag"]} \`${miktar}\` Adet mesaj silindi`).then(m => m.delete({timeout:6000})) 
}