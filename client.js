const Discord = require("discord.js");
const client = new Discord.Client();
const generate = require("./generate");
const yaml = require("js-yaml");
const fs = require("fs");

module.exports = { client };

/*************************************************************
 *                      Properties                           *
 *************************************************************/

client.rootChannel = null;
client.groupList = new Set();
client.adminSet = new Set();
client.prevNum = [];
client.prevAns = "no ans";
client.confidential = yaml.load(
  fs.readFileSync("confidential.yml", "utf8", (err) => {
    if (err) {
      console.error(err);
      return;
    }
  })
);

/*************************************************************
 *                         Helpers                           *
 *************************************************************/

client.replyGetGame = function (msg, haveAns = true) {
  do {
    this.prevNum = generate.getGame();
    this.prevAns = generate.getAns(this.prevNum);
  } while (haveAns && this.prevAns === "no ans");
  msg.channel.send(this.prevNum.join(", "));
};

client.replyAt = function (msg) {
  const group = msg.content.split(" ")[1];
  if (this.groupList.has(group)) {
    msg.channel.send(generate.atGroup(group));
  } else {
    msg.channel.send(
      "请选择以下group中的一个【均以美西时间为准】：\n晨练， 下午， 傍晚， 夜班车"
    );
  }
};

client.replyJoin = function (msg) {
  const group = msg.content.split(" ")[1];
  const auther = msg.author.toString();
  if (this.groupList.has(group)) {
    generate.joinGroup(group, auther);
  } else {
    msg.channel.send(
      "请选择以下group中的一个【均以美西时间为准】：\n晨练， 下午， 傍晚， 夜班车"
    );
  }
};

client.replyLeave = function (msg) {
  const group = msg.content.split(" ")[1];
  const author = msg.author.toString();
  if (this.groupList.has(group)) {
    generate.leaveGroup(group, author);
  } else {
    msg.channel.send(
      "请选择以下group中的一个【均以美西时间为准】：\n晨练， 下午， 傍晚， 夜班车"
    );
  }
};

client.replyAns = function (msg) {
  msg.channel.send(this.prevAns);
};

client.replyRoot = function (msg) {
  if (this.adminSet.has(msg.author.toString())) {
    this.rootChannel = msg.channel;
  } else {
    msg.channel.send("Only Admin can set the root");
  }
};

client.replyTellRoot = function (msg) {
  if (this.rootChannel !== null) {
    const message = msg.content.split(" ")[1];
    this.rootChannel.send(message + "望周知");
  } else {
    msg.channel.send("no root channel");
  }
};

client.replyIAmAdmin = function (msg) {
  const password = msg.content.split(" ")[1];
  if (password === this.confidential.adminpassword) {
    this.adminSet.add(msg.author.toString());
    msg.channel.send("hello admin");
  } else {
    msg.channel.send("wrong password");
  }
};

client.replyNetworth = function (msg) {
  const buyback = Number(msg.content.split(" ")[1]);
  if (!Number.isInteger(buyback) || buyback <= 0) {
    msg.channel.send("Usage: -networth <buyback cost>");
  } else {
    msg.channel.send(`The networth is ${Math.floor((buyback - 200) * 13)}`);
  }
};

client.msgHandler = function (msg) {
  if (msg.content === "-getG" || msg.content === "-getGame") {
    this.replyGetGame(msg);
  } else if (msg.content === "-getR" || msg.content === "-getRandomGame") {
    this.replyGetGame(msg, false);
  } else if (msg.content === "-help" || msg.content === "-h") {
    msg.channel.send(generate.getHelp());
  } else if (msg.content.startsWith("-at")) {
    this.replyAt(msg, client);
  } else if (msg.content.startsWith("-join")) {
    this.replyJoin(msg, client);
  } else if (msg.content.startsWith("-leave")) {
    this.replyLeave(msg, client);
  } else if (msg.content === "-ans") {
    this.replyAns(msg, client);
  } else if (msg.content === "-root") {
    this.replyRoot(msg, client);
  } else if (msg.content.startsWith("-tellRoot")) {
    this.replyTellRoot(msg, client);
  } else if (msg.content.startsWith("-iAmAdmin")) {
    this.replyIAmAdmin(msg, client);
  } else if (msg.content.startsWith("-net") || msg.content.startsWith("-networth")) {
    this.replyNetworth(msg);
  } else if (msg.content.startsWith("-")) {
    msg.channel.send("command not recognized");
  }
};

/*************************************************************
 *                          Events                           *
 *************************************************************/

client.on("message", client.msgHandler);

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
  client.groupList.add("晨练");
  client.groupList.add("下午");
  client.groupList.add("傍晚");
  client.groupList.add("夜班车");
});
