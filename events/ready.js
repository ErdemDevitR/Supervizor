const Discord = require("discord.js");
const config = require('../ayarlarım.js');
module.exports = async client => {
  client.user.setPresence({ activity: { type: "LISTENING", name: `GITHUB ❤️ ErdemDevitR`}, status: 'dnd' })

};
