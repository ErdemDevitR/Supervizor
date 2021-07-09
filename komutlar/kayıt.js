const Discord = require('discord.js');
const db = require('quick.db');
const veri = require('../veriler/veriler.json');
const ms = require('ms');
const moment = require('moment')
exports.config = {
    name:"kayıt",
    aliases:['k']
}
module.exports.run = async(client,message,args)=> {
    const sohbet = client.channels.cache.get(veri.Kanallar["sohbet"])
    const embed = new Discord.MessageEmbed().setColor('#2F3136')
    if(!message.member.roles.cache.has(veri.Roller["bot_command"])&&!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(embed.setDescription(`Bu komutu kullanabilmek için <@&${veri.Roller["bot_command"]}> rolüne sahip olman lazım`))
    let member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    let yapılcakisim = args.slice(1).join(" ").charAt(0).toUpperCase() + args.slice(1).join(" | ").slice(1)
    if(!member || !args[1] || !args[2] || isNaN(args[2])) return message.channel.send(embed.setDescription(`Yanlış kullanım. örn: .kayıt @erdem ismi yaşı`))
    if(!member.roles.cache.has(veri.Roller["kayıtsız"])) return message.channel.send(embed.setDescription(`Bu kullanıcıda kayıtsız rolü bulunamamkta`))
    if(member.roles.highest.position >= message.member.roles.highest.position) return;
    if(member.user.username.includes(veri.tag)) {
        member.setNickname(veri.tag+" "+yapılcakisim)
    } else {
        member.setNickname(veri.tagsız + " " + yapılcakisim)
    }
    const filter = (reaction,user) => {
        return [veri.Reactions.erkek,veri.Reactions.kadın].includes(reaction.emoji.name) && user.id === message.member.id
    }
    message.channel.send(embed.setDescription(`${member} Adlı kullanıcının ismi \`${yapılcakisim}\` olarak değiştirildi kullanıcının cinsiyeti **Erkek ise ${veri.Reactions.erkek}** **Kadın ise ${veri.Reactions.kadın}**`)).then(m => {
        m.react(veri.Reactions.erkek)
        .then( a => m.react(veri.Reactions.kadın))
        .then(s => m.awaitReactions(filter, {max:1, time:20000, errors:["time"]})
        .then(sj => {
            const reaction = sj.first();
            if(reaction.emoji.name===veri.Reactions.erkek) {
                member.roles.set(member.user.username.includes(veri.tag) ? [veri.Roller.taglı_rol,veri.Roller.erkek_1,veri.Roller.erkek_2] : [veri.Roller["erkek_1"],veri.Roller["erkek_2"]])
                db.add(`eteyit.${message.member.user.id}`,1)
                db.push(`isim.${member.user.id}`,member.displayName)
                db.delete(`kackere?${member.user.id}`)
                m.edit(embed.setDescription(`${member} Adlı kullanıcı başarıyla **Erkek** olarak kayıt edildi`).setFooter(`DevitR Was Here!`))
                sohbet.send(`${member} Adlı bey efendi aramıza katıldı`)
            }
            if(reaction.emoji.name===veri.Reactions.kadın) {
                member.roles.set(member.user.username.includes(veri.tag)? [veri.Roller.taglı_rol,veri.Roller.kadın_1,veri.Roller.kadın_2] : [veri.Roller["kadın_1"],veri.Roller["kadın_2"]])
                db.add(`kteyit.${message.member.user.id}`,1)
                db.push(`isim.${member.user.id}`,member.displayName)
                db.delete(`kackere?${member.user.id}`)
                m.edit(embed.setDescription(`${member} Adlı kullanıcı başarıyla **Kadın** olarak kayıt edildi`).setFooter(`DevitR Was Here!`))
                sohbet.send(`${member} Adlı hanım efendi aramıza katıldı`)
            }
        })
        )
    })
}