import {
  Client,
  Message,
  TextChannel,
  DMChannel,
  NewsChannel,
  User,
} from "discord.js";
import { randInt } from "./randint";
import { getAns } from "./24points";

interface MsgAttributes {
  channel: TextChannel | DMChannel | NewsChannel;
  author?: User;
  command?: string;
  flags?: string[];
}

export class Client24 extends Client {
  prevGame: number[] = [];
  prevAns: string = "";

  // TODO: preprocess( -help -> -h -getGame -> -getG)
  msgHandler(msg: Message) {
    const { channel, author, command, flags } = this.deconstructMsg(msg);
    if (author === this.user) {
      return;
    }
    switch (command) {
      case "-h":
      case "-help":
        this.help({ channel });
        break;
      case "-getG":
        this.getGame({ channel });
        break;
      case "-getA":
        this.getAnswer({ channel });
        break;
      case "-net":
      case "-networth":
        this.networth({ channel, flags });
        break;
      default:
    }
  }

  /******************************************************
   *              helpers for msgHandler                *
   ******************************************************/

  deconstructMsg(msg: Message) {
    const channel = msg.channel;
    const author = msg.author;
    const flags = msg.content.split(" ");
    const command = flags.shift();
    return { channel, author, command, flags } as MsgAttributes;
  }

  help({ channel }: MsgAttributes) {
    // TODO: localize
    channel.send(
      [
        "-h[elp]: get this message",
        "-getG: get a random 24 points game",
        "-getA: get an answer of the last game",
        "-net[worth] <buyback>: calculate networth by buyback cost",
      ].join("\n")
    );
  }

  getGame({ channel }: MsgAttributes, min = 1, max = 13) {
    do {
      this.prevGame = Array.from(Array(4)).map(() => randInt(min, max));
      this.prevAns = getAns(this.prevGame);
    } while (this.prevAns === "");
    channel.send(this.prevGame.join(", "));
  }

  getAnswer({ channel }: MsgAttributes) {
    channel.send(this.prevAns);
  }

  networth({ channel, flags }: MsgAttributes) {
    const buyback = Number(flags?.[0]);
    if (!Number.isInteger(buyback) || buyback < 200 || buyback > 100000000) {
      channel.send("Usage: -net <buyback cost>");
    } else {
      channel.send(`The networth is ${Math.floor((buyback - 200) * 13)}`);
    }
  }
}
