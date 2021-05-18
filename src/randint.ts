export function randInt(min: number, max: number) {
  // inclusive
  return Math.floor(min + Math.random() * (max - min + 1));
}
