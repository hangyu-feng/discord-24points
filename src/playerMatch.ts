import heroes from './config/heroes.json';

export interface PlayerMatch {
  account_id: number;
  match_id: number;
  hero_id: number;
  player_slot: number; // 0-127 are Radiant, 128-255 are Dire
  radiant_win: boolean;
  lobby_type: number;
  game_mode: number;
  start_time: number;
  duration: number;
  kills: number;
  deaths: number;
  assists: number;
  gold_per_min: number;
  hero_damage: number;
  tower_damage: number;
  hero_healing: number;
  last_hits: number;
  party_size: number;
}

export function isRadiant(pm: PlayerMatch): boolean {
  return pm.player_slot < 128;
}

export function win(pm: PlayerMatch): boolean {
  return isRadiant(pm) === pm.radiant_win;
}

export function isRanked(pm: PlayerMatch): boolean {
  return pm.lobby_type === 7;
}

export function isDmglow(pm: PlayerMatch): boolean {
    return pm.hero_damage<10000 ||pm.hero_damage/pm.last_hits<50;
}


export function hero(pm: PlayerMatch): string {
  return heroes[pm.hero_id - 1].localized_name;
}

function timeFormat(timeDiff: number): number[] {
  const dividers: number[] = [86400000, 60000];
  return dividers.map((x) => Math.trunc(timeDiff / x));
}

export function endTime(pm: PlayerMatch): string {
  const diff = timeFormat(Date.now() - pm.start_time - pm.duration);
  return diff[0] > 0 ? "之前" : `${diff[1]}分钟前`;
}
