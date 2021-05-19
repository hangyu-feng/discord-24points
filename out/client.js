"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Client24 = void 0;
const discord_js_1 = require("discord.js");
const randint_1 = require("./randint");
const _24points_1 = require("./24points");
class Client24 extends discord_js_1.Client {
    constructor() {
        super(...arguments);
        this.prevGame = [];
        this.prevAns = "";
    }
    msgHandler(msg) {
        const channel = msg.channel; // class: TextBasedChannel which I could not import
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
    help(channel) {
        // TODO: localize
        channel.send([
            "-h or -help: get this message",
            "-getG: get a random 24 points game",
            "-getA: get an answer of the last game",
            "-net <buyback>: calculate networth by buyback cost",
        ].join("\n"));
    }
    getGame(channel, min = 1, max = 13) {
        do {
            this.prevGame = Array.from(Array(4)).map(() => randint_1.randInt(min, max));
            this.prevAns = _24points_1.getAns(this.prevGame);
        } while (this.prevAns === "");
        channel.send(this.prevGame.join(", "));
    }
    getAnswer(channel) {
        channel.send(this.prevAns);
    }
    networth(channel, buyback) {
        if (!Number.isInteger(buyback) || buyback < 200 || buyback > 100000000) {
            channel.send("Usage: -networth <buyback cost>");
        }
        else {
            channel.send(`The networth is ${Math.floor((buyback - 200) * 13)}`);
        }
    }
}
exports.Client24 = Client24;
//# sourceMappingURL=client.js.map