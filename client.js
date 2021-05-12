const Discord = require('discord.js');
const client = new Discord.Client();
const getGame = require('./generate').getGame;
const getHelp = require('./generate').getHelp;
const atGroup = require('./generate').atGroup;
const getAns = require('./generate').getAns;
const joinGroup = require('./generate').joinGroup;
const leaveGroup = require('./generate').leaveGroup;


module.exports = { client };

var prevNum = ""; 
var prevAns = ""; 

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
  if (msg.content === '-getG' || msg.content === '-getGame') {
    
    while(true){
      prevNum = getGame()
      prevAns = getAns(prevNum)
      if(prevAns !== "no ans"){
        msg.channel.send(prevNum.join(", "))
        break;
      }
    }

  }
  else if (msg.content === '-getR' || msg.content === '-getRandomGame') {
    prevNum = getGame()
    prevAns = ""
    msg.channel.send(prevNum.join(", "))
  }
  else if (msg.content === '-help' || msg.content === '-h') {
    msg.channel.send(getHelp())
  }
  else if (msg.content.substr(0,4) === '-at ') {
    const group = msg.content.split(" ")[1]
    msg.channel.send(atGroup(group))
  }
  else if (msg.content.substr(0,6) === '-join ') {
    const group = msg.content.split(" ")[1]
    const auther = msg.author.toString()

    joinGroup(group,auther)
  }
  else if (msg.content === '-ans') {
    if(prevAns===""){
      prevAns = getAns(prevNum)
      msg.channel.send(prevAns)
    }
    else{
      msg.channel.send(prevAns)
    }

  }

});
