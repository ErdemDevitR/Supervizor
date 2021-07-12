const Discord = require("discord.js")     
const client = new Discord.Client();       
const config = require("./onemli.js")    

const fs = require("fs");                
require('./util/Loader.js')(client);     

client.commands = new Discord.Collection(); 
client.aliases = new Discord.Collection();  
const db = require('quick.db')
const veri = require('./veriler/veriler.json')
const moment = require('moment')
const ms = require('ms')
const { settings } = require("cluster");
fs.readdir('./komutlar/', (err, files) => { 
  if (err) console.error(err);               
  console.log(`${files.length} komut yüklenecek.`); 
  files.forEach(f => {                       
    let props = require(`./komutlar/${f}`);   
    console.log(`${props.config.name} komutu yüklendi.`);       
    client.commands.set(props.config.name, props); 
    props.config.aliases.forEach(alias => {          
      client.aliases.set(alias, props.config.name);  
    });
  });
})

client.login(config.token)
const register = new Discord.WebhookClient(veri.Kanallar["register_chat_ID"],veri.Kanallar["register_chat_TOKEN"])
const gLOG = client.channels.cache.get(veri.Loglar["ceza_log"])
const giris = client.channels.cache.get(veri.Kanallar["gelen-gidenler"])
const sohbet = client.channels.cache.get(veri.Kanallar["sohbet"])
const Invites = new Discord.Collection();
client.on('ready',() => {
  client.guilds.cache.forEach(guild => {
    guild.fetchInvites().then(_invites => {
      Invites.set(guild.id, _invites);
    }).catch(error => { })
  });
});
client.on('inviteCreate', (invite) => {
  var gi = Invites.get(invite.guild.id) || new Discord.Collection();
  gi.set(invite.code, invite);
  Invites.set(invite.guild.id, gi)
});
client.on('inviteDelete', (invite) => {
  var gi = Invites.set(invite.guild.id) || new Discord.Collection();
  gi.set(invite.code, invite);
  Invites.set(invite.guild.id, gi)
})
client.on('guildCreate', (guild) => {
  guild.fetchInvites().then(invites => {
    Invites.set(guild.id, invites);
  }).catch(error => { })
})
client.on('guildMemberAdd',async member => {
  client.gecmistrahit = (date) => {
    const startedAt = Date.parse(date);
    var msecs = Math.abs(new Date() - startedAt);
    const years = Math.floor(msecs / (1000 * 60 * 60 * 24 * 365));
    msecs -= years * 1000 * 60 * 60 * 24 * 365;
    const months = Math.floor(msecs / (1000 * 60 * 60 * 24 * 30));
    msecs -= months * 1000 * 60 * 60 * 24 * 30;
    const weeks = Math.floor(msecs / (1000 * 60 * 60 * 24 * 7));
    msecs -= weeks * 1000 * 60 * 60 * 24 * 7;
    const days = Math.floor(msecs / (1000 * 60 * 60 * 24));
    msecs -= days * 1000 * 60 * 60 * 24;
    const hours = Math.floor(msecs / (1000 * 60 * 60));
    msecs -= hours * 1000 * 60 * 60;
    const mins = Math.floor((msecs / (1000 * 60)));
    msecs -= mins * 1000 * 60;
    const secs = Math.floor(msecs / 1000);
    msecs -= secs * 1000;
  
    var string = "";
    if (years > 0) string += `${years} yıl`
    else if (months > 0) string += `${months} ay ${weeks > 0 ? weeks+" hafta" : ""}`
    else if (weeks > 0) string += `${weeks} hafta ${days > 0 ? days+" gün" : ""}`
    else if (days > 0) string += `${days} gün ${hours > 0 ? hours+" saat" : ""}`
    else if (hours > 0) string += `${hours} saat ${mins > 0 ? mins+" dakika" : ""}`
    else if (mins > 0) string += `${mins} dakika ${secs > 0 ? secs+" saniye" : ""}`
    else if (secs > 0) string += `${secs} saniye`
    else string += `saniyeler`;
    string = string.trim();
    return `${string} once`;
  };
  const embed = new Discord.MessageEmbed().setColor('#2F3136')
  if(member.user.bot) return;
  let zaman1 = Date.now() - member.user.createdTimestamp
  let zaman2 = new Date().getTime() - member.user.createdAt.getTime();
  let jail = db.get(`cezayedi.${member.user.id}`) || [];
  let mute = db.get(`muteyedi.${member.user.id}`) || [];
  let vmute = db.get(`vmuteyedi.${member.user.id}`) || [];
  if(zaman2 < 1000*60*60*24*7) {
    await member.roles.set([veri.Roller["cezalı"]],veri.Roller["muteli"])
    const e = embed.setDescription(`${member.user.tag} (\`${member.user.id}\`) Adlı kullanıcı hesabı ${client.gecmistrahit(member.user.createdAt)} kurulduğundan cezalıya atıldı.`)
    register.send(e)
    member.send(e).catch(error => gLOG.send(`Kullanıcının dmi kapalı\n${error}`))
    return
  }

  if(vmute.some(muteyedisalak => muteyedisalak.includes(member.id))) {return member.roles.add(veri.Roller["vmuteli"]).catch();}
  if(mute.some(x => x.includes(member.id))) {return member.roles.add(veri.Roller["muteli"]).catch();}
  if(jail.some(y => y.includes(member.id))) {return member.roles.add(veri.Roller["cezalı"]).catch();}
  if(member.user.username.includes(veri.tag)) {
    member.setNickname(`${veri.tag} İsim | Yaş`)
    member.roles.add(veri.Roller["taglı_rol"])
    member.roles.add(veri.Roller["kayıtsız"])
  } else {
    member.setNickname(`${veri.tagsız} İsim | Yaş`)
    member.roles.add(veri.Roller["kayıtsız"])
  }
  await member.roles.add(veri.Roller["kayıtsız"])
  var guild = member.guild
  let aylar = {
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
  var fakemi;
  if(zaman1 > 1000*60*60*24*7) {fakemi = `Güvenilir`} else {fakemi = `Fake`}
db.add(`kackere?${member.user.id}`,1)
let kackeree = db.fetch(`kackere?${member.user.id}`)
let limit = 3
let kackere = ""
guild.fetchInvites().then(invites => {
  const gi = new Discord.Collection().concat(Invites.get(member.guild.id));
  var invite = invites.find(_i => gi.has(_i.code) && gi.get(_i.code).uses < _i.uses) || gi.find(_i => !invites.has(_i.code)) || guild.vanityURLCode
  Invites.set(member.guild.id, invites)
  var ha;
  var kim;
  if(invite == guild.vanityURLCode) ha = `Kullanıcı özel URL'mizi kullanarak giriş yaptı :tada:`, kim = `Kullanıcı özel URL kullanarak giriş yaptı veya ulaşamadığım bir davet!`
  else ha = `Kullanıcı ${invite.inviter} daveti sayesinde giriş yaptı :tada:`, kim = `Kullanıcı <@${invite.inviter}> daveti sayesinde giriş yaptı!`
  db.set(`kimetti?${member.user.id}`,kim)
if(!kackeree) {
  if(kackeree === null || kackeree === undefined || kackeree === NaN)
  kackere = `Sunucuya ilk kez giriyorsun. (0/${limit})`
} else {
  kackere = `Sunucuya kayıt olmadan **${kackeree}.** girişin (${kackeree}/${limit})`
}
if(kackeree == limit) {
  guild.members.ban(member,{reason:"Token Koruması"})
}
//aramızakatılanlar.send(embed.setDescription(`${member} Adlı kullanıcı aramıza katıldı.\n Toplamda **${client.guilds.cache.reduce((a, b)=> a + b.memberCount, 0).toLocaleString()}** kişiyiz.`).setFooter(`.`))
register.send(`:tada: ${member} Adlı kullanıcı aramıza katıldı (\`${member.user.id}\`)\n\n${veri.Emojiler["tag"]} Kayıt olmak için sol tarafda ki odalara girebilirsiniz \n${veri.Emojiler["tag"]} <@&${veri.Roller["bot_command"]}> rolünde ki kullanıcılar sizin ile ilgilenecektir.\n${veri.Emojiler["tag"]} Kullanıcının hesabı ${client.gecmisTarihHesaplama(member.user.createdAt)} açılmış hesabı **${fakemi}**\n`+
`${veri.Emojiler["tag"]} Hesabının kurulma tarihi: ${moment(member.user.createdAt).format("DD")} ${aylar[moment(member.user.createdAt).format("MM")]} ${moment(member.user.createdAt).format("YYYY MM:mm:ss")}\n`+
`${veri.Emojiler["tag"]} ${kackere}[GIF](https://cdn.discordapp.com/attachments/752838709677916230/837439104060358686/ezgif.com-video-to-gif_1.gif)\n${veri.Emojiler["tag"]} ${ha}`)
})
})
client.on('guildMemberRemove',async member => {
  const embed = new Discord.MessageEmbed().setColor('#2F3136')
  db.delete(`eteyit.${member.user.id}`)
  db.delete(`kteyit.${member.user.id}`)
 // aramızdanayrılanlar.send(embed.setDescription(`${member} | ${member.user.tag} (\`${member.user.id}\`) Adlı kullanıcı aramızdan ayrıldı.\n Toplamda **${client.guilds.cache.reduce((a, b)=> a+b.memberCount, 0).toLocaleString()}** kişiyiz`))
})
client.on('userUpdate', async user => {
  const embed = new Discord.MessageEmbed().setColor('#2F3136')
  let member = client.guilds.cache.get(veri.sunucuid).members.cache.get(user.id);
  let jail = db.get(`cezayedi.${user.id}`) || [];
  let mute = db.get(`muteyedi.${user.id}`) || [];
  let vmute = db.get(`vmuteyedi.${user.id}`) || [];
  if(!member.roles.cache.has(veri.Roller["taglı_rol"])) {
    if(member.user.username.includes(veri.tag)) {
      client.channels.cache.get(veri.Loglar["tag_log"]).send(new Discord.MessageEmbed().setColor('#2F3136').setDescription(`${member} Adlı kullanıcı \`${veri.tag}\` tagımızı aldı`).setFooter(member.user.tag))
      await member.roles.add(veri.Roller["taglı_rol"])
      await member.setNickname(member.displayName.replace(veri.tagsız, veri.tag)).catch()
    }
    } else {
      if(member.roles.cache.has(veri.Roller["taglı_rol"])) {
      if(!member.user.username.includes(veri.tag)) {
        await member.setNickname(member.displayName.replace(veri.tag, veri.tagsız)).catch()
       client.channels.cache.get(veri.Loglar["tag_log"]).send(new Discord.MessageEmbed().setColor('#2F3136').setDescription(`${member} Adlı kullanıcı tagımızı bıraktı`).setFooter(member.user.tag))
        if(member.roles.cache.has(veri.Roller["erkek_2"])) { 
          if(member.roles.cache.has(veri.Roller["muteli"])) return;
          if(member.roles.cache.has(veri.Roller["vmuteli"])) return;
          if(member.roles.cache.has(veri.Roller["cezalı"])) return;
           member.roles.set(member.roles.cache.has(veri.Roller["booster"]) ? [veri.Roller["booster"], veri.Roller["erkek_1"],veri.Roller["erkek_2"]] : [veri.Roller["erkek_1"],veri.Roller["erkek_2"]])
      } else {
        if(member.roles.cache.has(veri.Roller["kadın_2"])) {
          if(member.roles.cache.has(veri.Roller["muteli"])) return;
          if(member.roles.cache.has(veri.Roller["vmuteli"])) return;
          if(member.roles.cache.has(veri.Roller["cezalı"])) return;
        member.roles.set(member.roles.cache.has(veri.Roller["booster"]) ? [veri.Roller["booster"],veri.Roller["kadın_1"],veri.Roller["kadın_2"]] : [veri.Roller["kadın_1"],veri.Roller["kadın_2"]])
       }
      }
    }
  }
}
})

client.on('ready',()=> {
  client.channels.cache.get(veri.Kanallar["bot_odası"]).join()
})
client.on('message', async message => {
  if(message.author.bot) return;
if(message.content.toLocaleLowerCase().includes("tag")) {
  message.channel.send("\`"+ veri.tag + "\`")
}
  if(message.content.toLocaleLowerCase()=="link") {
    message.channel.send("https://discord.gg/eQ7ANRhVea")
  }
})
