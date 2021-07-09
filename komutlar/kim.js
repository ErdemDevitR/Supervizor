const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js');
const db = require('quick.db');
const { get, push } = require('quick.db')
const veri = require('../veriler/veriler.json');
const ms = require('ms');
const moment = require('moment');
require('moment-duration-format');
module.exports.run = async (client,message,args) => {
    if(!message.member.roles.cache.has(veri.Roller.bot_command) && !message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(new MessageEmbed().setColor('#2F3136')
    .setDescription(`Malesef! bu komutu kullanmak için <@&${veri.Roller.bot_command}> rolüne sahip olman gerekiyor!`)).then(message.delete())
    let member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    if(!member) return message.channel.send('Bir üye etiketlemelisin').then(message.delete())
    let kim = get(`kimetti?${member.user.id}`) || `Davet eden kullanıcı bulunamadı`
    let vakit = Date.now() - member.joinedTimestamp
    let isim = get(`isim.${member.user.id}`) || [member.displayName]
    const embed = new MessageEmbed().setColor('#2F3136')
    .setDescription(`**Kullanıcı:** ${member}\n`)
    .addField('Sunucuya Katıldığı Zaman;',`__${moment.duration(vakit).format('M [Ay, ] D [gün, ] h [saat, ] m [dakika, ] s [saniye]')}__ önce`)
    .addField(`Bazı Rolleri;`,member.roles.cache.size > 7 ? "7 Den fazla role sahip" : member.roles.cache.map(role => role.toString()))
    .addField(`Sahip Olduğu En Yüksek Rol;`,`(${member.roles.highest},\`ID:\`${member.roles.highest.id})`)
    .addField(`Gözükdüğü İsmi;`,member.displayName)
    .addField(`İsim Geçmişi;`,`\`\`\`${isim.join('\n')}\`\`\``)
    .addField(`Kullanıcı Nasıl Katıldı;`,kim)
    .setFooter(`ALESTA ❤️ ErdemDevitR`)
    .setTimestamp()
    .setAuthor(`Kullanıcı Bilgileri`,member.user.avatarURL({dynamic:true}))
    .setThumbnail(message.guild.iconURL({dynamic:true}))
    message.channel.send(embed)
}
exports.config = {
    name:'kim',
    aliases:[]
}