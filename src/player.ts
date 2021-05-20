import { API_URL, NUM_MATCHES } from "./utils";
import axios from "axios";

export class Player {
  id: number = 0;

  async verifyPlayer(): Promise<boolean> {
    const url = `${API_URL}/players/${this.id}`;
    let flag: boolean = false;
    await axios
      .get(url)
      .then(function (response) {
        flag = response.data.hasOwnProperty("profile");
      })
      .catch(function (error) {
        console.log(error);
      });
    return flag;
  }

  // async verifyPlayer(): Promise<boolean> {
  //   const url = `${API_URL}/players/${this.id}`;
  //   let flag: boolean = false;
  //   await axios
  //     .get(url)
  //     .then(function (response) {
  //       flag = response.data.hasOwnProperty("profile");
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //     });
  //   return flag;
  // }

  async fetchRecentMatches() {
    const url = `${API_URL}/players/${this.id}/Matches`;
    const config = {
      params: { limit: NUM_MATCHES },
    };
    await axios.get(url, config);
  }
}
