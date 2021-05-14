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
var rootChannel = null;

const yaml = require('js-yaml');
const fs = require('fs');
const confidential = yaml.load(fs.readFileSync('confidential.yml', 'utf8', err => {
  if (err) {
    console.error(err)
    return
  }
}));


const GroupList = new Set();
const adminSet = new Set();

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  GroupList.add("晨练")
  GroupList.add("下午")
  GroupList.add("傍晚")
  GroupList.add("夜班车")
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
    if(GroupList.has(group)){
      msg.channel.send(atGroup(group))
    }
    else{
      msg.channel.send("请选择以下group中的一个【均以美西时间为准】：\n晨练， 下午， 傍晚， 夜班车")
    }
    
  }
  else if (msg.content.substr(0,6) === '-join ') {
    const group = msg.content.split(" ")[1]
    const auther = msg.author.toString()
    if(GroupList.has(group)){
      joinGroup(group,auther)
    }
    else{
      msg.channel.send("请选择以下group中的一个【均以美西时间为准】：\n晨练， 下午， 傍晚， 夜班车")
    }
  }
  else if (msg.content.substr(0,7) === '-leave ') {
    const group = msg.content.split(" ")[1]
    const auther = msg.author.toString()
    if(GroupList.has(group)){
      leaveGroup(group,auther)
    }
    else{
      msg.channel.send("请选择以下group中的一个【均以美西时间为准】：\n晨练， 下午， 傍晚， 夜班车")
    }
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
  else if (msg.content === '-root') {
    if(adminSet.has(msg.author.toString())){
      rootChannel = msg.channel;
    }
    else{
      msg.channel.send("Only Admin can set the root")
    }
  }
  else if (msg.content.substr(0,10) === '-tellRoot ') {
    if(rootChannel!==null){
      const message = msg.content.split(" ")[1]
      rootChannel.send(message +"望周知")
    }
    else{
      msg.channel.send("no root channel")
    }
  }
  else if (msg.content.substr(0,10) === '-IamAdmin ') {
    const password = msg.content.split(" ")[1]
    if(password===confidential.adminpassword){
      adminSet.add(msg.author.toString())
      msg.channel.send("hello admin")
    }
    else{
      msg.channel.send("wrong password")
    }
    
  }

});
