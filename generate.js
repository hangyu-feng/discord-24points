module.exports = { getGame };

// return random int between min and max (including min and max)
function randInt(min, max) {
  return Math.floor(min + Math.random() * (max - min + 1));
}

function getGame(min = 1, max = 13) {
  const numbers = Array.from(Array(4)).map(x=>randInt(min, max));
  return numbers.join(", ");
}
