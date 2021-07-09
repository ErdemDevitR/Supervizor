const Discord = require('discord.js');
const db = require('quick.db');
const moment = require('moment');
const veri = require('../veriler/veriler.json')
exports.config = {
    name:"notlarım",
    aliases:[]
}
module.exports.run = async(client,message,args) => {
    const embed = new Discord.MessageEmbed().setColor('#2F3136')
    if(message.author.id!=="758079799041196113") return message.channel.send(':x:')
    message.channel.send(embed.setDescription(`Merhaba Erdem,\nToplamda **${db.fetch(`notno.${veri.sunucuid}`)}** Adet notun bulunmakta,\nİşte senin için kaydettiğim notların;\n\`\`\`${db.get(`not.${veri.sunucuid}`).join("\n")}\`\`\``))
}