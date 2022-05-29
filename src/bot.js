const { Telegraf, session } = require('telegraf')
const I18n = require('telegraf-i18n')
const path = require('path')

const bot = new Telegraf('5087185454:AAHhXKezCImuVuuXNAkhalw_Au8e3FGiRbE');

const i18n = new I18n({
  directory: path.resolve(__dirname, 'locales'),
  useSession: true,
  sessionName: 'session'
})

bot.use(session())
bot.use(i18n.middleware())

bot.use((ctx, next) => {
  ctx.session = ctx.session || {};
  next();
})

bot.start(async ctx => ctx.replyWithHTML(ctx.i18n.t('greeting')))

bot.command('ru', async ctx => ctx.i18n.locale('ru'))
bot.command('uz', async ctx => ctx.i18n.locale('uz'))


bot.launch()