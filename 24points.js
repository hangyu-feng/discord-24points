const Discord = require('discord.js');
const yaml = require('js-yaml');
const fs = require('fs');

const getGame = require('./generate').getGame

const confidential = yaml.load(fs.readFileSync('confidential.yml', 'utf8', err => {
  if (err) {
    console.error(err)
    return
  }
}));

const client = new Discord.Client();

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
  if (msg.content === '-get') {
    msg.channel.send(getGame())
  }
});


client.login(confidential.token);
