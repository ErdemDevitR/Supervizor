const Discord = require('discord.js')
const db = require('quick.db')
const veri = require('../veriler/veriler.json')
exports.config = {
    name:"isimler",
    aliases:[]
}
module.exports.run = async(client, message, args) => {
    const embed = new Discord.MessageEmbed().setColor('#2F3136')
    if(!message.member.roles.cache.has(veri.Roller["bot_command"])&&!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(embed.setDescription(`Bu komutu kullanabilmek için <@&${veri.Roller["bot_command"]}> rolüne sahip olman lazım`))
    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
    const isimler = db.get(`isim.${member.user.id}`)
    const red = client.emojis.cache.find(a => a.name==="red")
    if(!isimler) return message.channel.send(embed.setDescription(`\`Hata: \` Veri kayıdı yok.`)).then(m => m.delete({timeout:3000}))
        message.channel.send(embed.setDescription(`${member} Adlı kullanıcının sunucuda bulunan isim kayıdları aşağıda belirtilmiştir;\n\n${red} ${member.user.tag} Adlı kullanıcının isim kayıdları [**${isimler.length}**]\n`+
        `\`\`\`${isimler.join("\n")}\`\`\``))
}
