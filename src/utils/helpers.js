const { hasUser } = require("../core/db");
const { emojis } = require("./config");

async function isAuth(userId) {
  const user = await hasUser(userId);
  return Boolean(user[0]);
}

function arrayShuffler(array) {
  let currentIndex = array.length,  randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex !== 0) {

    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}

function getRandomEmoji() {
  const random = Math.floor(Math.random() * emojis.length);
  return emojis[random];
}

module.exports = {
  isAuth,
  getRandomEmoji,
  arrayShuffler
}