import { Client, Message, TextChannel, DMChannel, NewsChannel } from "discord.js";
import { randInt } from "./randint";
import { getAns } from "./24points";

export class Client24 extends Client {
  prevGame: number[] = [];
  prevAns: string = "";

  msgHandler(msg: Message) {
    const channel = msg.channel  // class: TextBasedChannel which I could not import
    const commands = msg.content.split(" ");
    switch (commands?.[0]) {
      case "-h":
      case "-help":
        this.help(channel);
        break;
      case "-getG":
        this.getGame(channel);
        break;
      case "-getA":
        this.getAnswer(channel);
        break;
      case "-net":
        const buyback = Number(commands?.[1]);
        this.networth(channel, buyback);
        break;
      default:
    }
  }

  help(channel: TextChannel | DMChannel | NewsChannel) {
    // TODO: localize
    channel.send([
      "-h or -help: get this message",
      "-getG: get a random 24 points game",
      "-getA: get an answer of the last game",
      "-net <buyback>: calculate networth by buyback cost",
    ].join("\n"));
  }

  getGame(channel: TextChannel | DMChannel | NewsChannel, min = 1, max = 13) {
    do {
      this.prevGame = Array.from(Array(4)).map(() => randInt(min, max));
      this.prevAns = getAns(this.prevGame);
    } while (this.prevAns === "");
    channel.send(this.prevGame.join(", "));
  }

  getAnswer(channel: TextChannel | DMChannel | NewsChannel) {
    channel.send(this.prevAns);
  }

  networth(channel: TextChannel | DMChannel | NewsChannel, buyback: number) {
    if (!Number.isInteger(buyback) || buyback < 200 || buyback > 100000000) {
      channel.send("Usage: -networth <buyback cost>");
    } else {
      channel.send(`The networth is ${Math.floor((buyback - 200) * 13)}`);
    }
  }
}
