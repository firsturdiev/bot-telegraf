const { Telegraf, session } = require('telegraf');
const i18n = require('../core/i18n');
const config = require('../utils/config');

const bot = new Telegraf(config.BOT_TOKEN);
bot.use(session());
bot.use((ctx, next) => {
    ctx.session = ctx.session || {};
    next();
})
bot.use(i18n.middleware());


module.exports = bot;