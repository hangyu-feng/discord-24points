const Discord = require('discord.js');
const client = new Discord.Client();
const yaml = require('js-yaml');
const fs = require('fs');


const confidential = yaml.load(fs.readFileSync('confidential.yml', 'utf8', err => {
  if (err) {
    console.error(err)
    return
  }
}));

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
  if (msg.content === 'ping') {
    msg.reply('pong');
  }
});


client.login(confidential.token);
