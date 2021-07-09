const Discord = require('discord.js')
const db = require('quick.db');
const veri = require('../veriler/veriler.json');
const ms = require('ms');
const moment = require('moment');
const { DiscordAPIError } = require('discord.js');
exports.config = {
    name:"çek",
    aliases:['cek']
}
module.exports.run = async(client,message,args)=> {
    const embed = new Discord.MessageEmbed().setColor('#2F3136')
    if(!message.member.roles.cache.has(veri.Roller["room_staff"]) && !message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(embed.setDescription(`Bu komutu kullanabilmek için <@&${veri.Roller.room_staff}> rolüne sahip olman lazım`))
    const uye = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    const uye1 = message.guild.members.cache.get(args[1]);
    if(!uye) return message.channel.send("Bir üye __etiketlemelisin__")
    if(!uye.voice.channel) return message.channel.send(embed.setDescription(`${uye} Adlı kullanıcı bir sesli kanala bağlı değil`))
    if(uye1) {
    if(!uye1.voice.channel) return message.channel.send(embed.setDescription(`${uye1} adlı kullanıcı bir sesli kanala bağlı değil`))}
    if(uye.voice.channelID = message.member.channelID) return message.channel.send("Zaten aynı kanaldasınız")
    if(!uye1) {
        uye.voice.setChannel(message.member.voice.channelID)
        message.channel.send(embed.setDescription(`${uye} Adlı kullanıcı <#${message.member.voice.channelID}> kanalına taşındı`))
    return}
    await uye.voice.setChannel(message.member.voice.channelID)
    await uye1.voice.setChannel(message.member.voice.channelID)
    message.channel.send(embed.setDescription(`${uye}, ${uye1} Adlı kullanıcı üyeler <#${message.member.voice.channelID}> kanalına taşındılar`).setFooter('DevitR Was Here!'))
}