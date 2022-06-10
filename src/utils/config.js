require('dotenv').config()

const config = {
  BOT_TOKEN: process.env.BOT_TOKEN,
  ADMINS: process.env.ADMINS.split(',').map(item => Number(item)),
  DATABASE_PORT: process.env.DATABASE_PORT,
  DATABASE_NAME: process.env.DATABASE_NAME,
  DATABASE_USER: process.env.DATABASE_USER,
  DATABASE_PASS: process.env.DATABASE_PASS,
  DATABASE_HOST: process.env.DATABASE_HOST,

  emojis: [
    {
      name: "ball",
      emoji: "⚽"
    },
    {
      name: "rabbit",
      emoji: "🐇"
    },
    {
      name: "banana",
      emoji: "🍌"
    },
    {
      name: "car",
      emoji: "🚕"
    },
    {
      name: "girl",
      emoji: "👧"
    },
    {
      name: "book",
      emoji: "📕"
    },
    {
      name: "apple",
      emoji: "🍎"
    },
    {
      name: "cat",
      emoji: "🐱"
    },
    {
      name: "dog",
      emoji: "🐶"
    },
    {
      name: "pizza",
      emoji: "🍕"
    },
    {
      name: "pig",
      emoji: "🐷"
    },
    {
      name: "panda",
      emoji: "🐼"
    },
    {
      name: "penguin",
      emoji: "🐧"
    },
    {
      name: "box",
      emoji: "📦",
    },
    {
      name: "ocean",
      emoji: "🌊"
    },
    {
      name: "sun",
      emoji: "☀️"
    },
    {
      name: "moon",
      emoji: "🌙"
    },
    {
      name: "star",
      emoji: "⭐"
    },
    {
      name: "rain",
      emoji: "🌧"
    },
    {
      name: "cloud",
      emoji: "☁️"
    },
    {
      name: "snow",
      emoji: "❄️"
    },
    {
      name: "mountain",
      emoji: "⛰"
    },
    {
      name: "lemon",
      emoji: "🍋"
    },
    {
      name: "cherry",
      emoji: "🍒"
    },
    {
      name: "heart",
      emoji: "❤️"
    },
    {
      name: "monkey",
      emoji: "🐵"
    },
    {
      name: "tiger",
      emoji: "🐯"
    },
    {
      name: "elephant",
      emoji: "🐘"
    },
    {
      name: "snake",
      emoji: "🐍"
    },
    {
      name: "bird",
      emoji: "🐦"
    },
    {
      name: "fish",
      emoji: "🐟"
    },
    {
      name: "frog",
      emoji: "🐸"
    },
    {
      name: "laptop",
      emoji: "💻"
    },
    {
      name: "phone",
      emoji: "📱"
    },
    {
      name: "tv",
      emoji: "📺"
    },
    {
      name: "syringe",
      emoji: "💉"
    },
    {
      name: "medicine",
      emoji: "💊"
    },
    {
      name: "present",
      emoji: "🎁"
    },
    {
      name: "letter",
      emoji: "✉️"
    },
    {
      name: "pen",
      emoji: "🖊"
    },
    {
      name: "pencil",
      emoji: "🖋"
    },
    {
      name: "search",
      emoji: "🔍"
    },
    {
      name: "clock",
      emoji: "⏰"
    },
    {
      name: "calendar",
      emoji: "📅"
    },
    {
      name: "boy",
      emoji: "👦"
    },
    {
      name: "flag",
      emoji: "🏴"
    },
    {
      name: "lock",
      emoji: "🔒"
    },
    {
      name: "ballon",
      emoji: "🎈"
    },
    {
      name: "door",
      emoji: "🚪"
    },
    {
      name: "glass",
      emoji: "🥃"
    },
    {
      name: "bread",
      emoji: "🍞"
    }
  ]
};

module.exports = config;