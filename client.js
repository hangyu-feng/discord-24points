const Discord = require('discord.js');
const client = new Discord.Client();
const getGame = require('./generate').getGame;

module.exports = { client };


client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
  if (msg.content === '-get') {
    msg.channel.send(getGame())
  }
});
