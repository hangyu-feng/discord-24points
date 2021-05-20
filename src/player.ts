import { API_URL, NUM_MATCHES } from "./utils";
import { PlayerMatch } from "./playerMatch";
import axios from "axios";
import { resolve } from "path/posix";

export class Player {
  id: number;

  constructor(id: number) {
    this.id = id;
  }

  async verify(): Promise<boolean> {
    const url = `${API_URL}/players/${this.id}`;
    let flag: boolean = false;
    return new Promise<boolean>((resolve, reject) => {
      axios
        .get(url)
        .then((response) => resolve(response.data.hasOwnProperty("profile")))
        .catch((err) => reject(false));
    });
  }

  async fetchRecentMatches(): Promise<PlayerMatch[]> {
    const url = `${API_URL}/players/${this.id}/Matches`;
    const config = {
      params: { limit: NUM_MATCHES },
    };
    return new Promise<PlayerMatch[]>((resolve, reject) => {
      axios.get(url, config).then((response) => {
        // resolve(response.data as PlayerMatch[]);
        // const a: PlayerMatch = { ...response.data[0] };int
        resolve(
          response.data.map((x: any) => {
            return { ...x } as PlayerMatch;
          })
        );
      });
    });
  }
  //   analyseMatch(match: PlayerMatch): void {
  //   const playerName = 'pppp';
  //   let result: string = '';
  //   result += match.player_slot<128 && match.radiant_win)
  //    ? `ono, ${playerName} just win a game without us`
  //    : ` Hooray! ${playerName} just lose a game`;
  //    result += ''
  // result +='\n';
  // result += `${playerName} plays ${getHeroName()}`
  // if (match.kills<3) result+= ` and only killed ${match.kills}`;
  // // death >=10 kda<1.1.hero_dmg <10k, tower_dmg < 1k, her_dmg/last_hit < a number party_size===1
  // }
}
