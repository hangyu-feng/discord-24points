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
import { Player } from "./player";

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
      case "-m":
        this.startMonitor({ channel, flags });  // 5/20 早晨神志不清的BKB写的代码
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

  // start of 5/20 早晨神志不清的bkb写的代码
  executeAsync(func: () => void) {
    setTimeout(func, 1000 *60);
  }
  startMonitor({ channel, flags }: MsgAttributes) {
    flags =flags ?? [];
    if (flags) {
      channel.send(`开始偷偷看${flags[0]} 偷偷打dodo`);
      channel.send(`==================================`);
      new Player(Number(flags[0])).fetchRecentMatches().then((result) => {
        const timeDiff:number = Date.now() - result[0].start_time - result[0].duration;
        if (timeDiff<1000*60*60) {
          channel.send(`${flags?.[0]} 刚刚在偷偷打dodo！`);
        }
        Array.from([1, 1, 1, 1, 1]).forEach((x) => {
          this.executeAsync(() => {
            new Player(Number(flags?.[0]))
              .fetchRecentMatches()
              .then((result) => {
                const timeDiff:number = Date.now() - result[0].start_time - result[0].duration;
                if (timeDiff<1000*60*60) {
                  channel.send(`${flags?.[0]} 刚刚在偷偷打dodo！`);
                }
              });
            return;
          });
        });
      });
    }

  }
  // end of 5/20 早晨神志不清的BKB写的代码

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
