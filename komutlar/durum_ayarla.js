const Discord = require('discord.js');
const idim = "758079799041196113"
module.exports.run = async(client,message,args) => {
    if(!message.author.id==idim) return;
    if(args[0] == 'sıfırla' || args[0] == 'düzelt') {
        client.user.setPresence({ activity: { type: "LISTENING", name: `ALESTA ❤️ ErdemDevitR`}, status: 'dnd' })
        message.channel.send('DURUM SIFIRLANDI!')
    return}
    if(!args[1] || !args[0]) return;
    message.channel.send('Hazırlanılıyor!').then(m => {
    let durum = args.slice(1).join(" ")
    let dur = args[0]
    client.user.setPresence({ activity: { type: "LISTENING", name: durum}, status: dur })
    m.edit(`Başarıyla durumuma \`${durum}\` yazdım, aktivitemi ise \`${dur}\` şeklinde değiştirdim!`)
    })
}
exports.config = {name: 'bot',aliases:[]}