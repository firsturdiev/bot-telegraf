const { Markup } = require('telegraf');
const { emojis } = require('./config');
const { arrayShuffler } = require('../utils/helpers');

const startMenu = ctx => {
  return Markup.keyboard([
    [Markup.button.text(ctx.i18n.t('startMenu.bloggers'))],
    [Markup.button.text(ctx.i18n.t('startMenu.help')), Markup.button.text(ctx.i18n.t('startMenu.settings'))]
  ]).oneTime().resize()
}

const bloggersMenu = (i18n) => {
  return Markup.keyboard([
    [Markup.button.text(i18n.t('startMenu.list')), Markup.button.text(i18n.t('startMenu.rating'))],
    [Markup.button.text(i18n.t('startMenu.goHome'))]
  ]).oneTime().resize()
}

const bloggersListMenu = data => {
  return Markup.inlineKeyboard(data.map(item => {
    return [Markup.button.callback(item.name, `bloggers:${item.id}`)]
  }))
}

const voteMenu = (i18n, id) => {
  return Markup.inlineKeyboard([
    [Markup.button.callback(i18n.t('bloggers.vote'), `vote:${id}`)],
    [Markup.button.callback(i18n.t('startMenu.goBack'), 'vote:goBack')]
  ])
}

const voteBackMenu = (i18n) => {
  return Markup.inlineKeyboard([
    [Markup.button.callback(i18n.t('startMenu.goBack'), 'vote:goBack')]
  ])
}

const goHomeMenu = ctx => {
  return Markup.keyboard([
    [Markup.button.text(ctx.i18n.t('startMenu.goHome'))]
  ]).oneTime().resize()
}

const emojiMenu = (emoji) => {
  const data = arrayShuffler(emojis).slice(0, 5);
  data.push(emoji)
  const line1 = data.slice(0, 3).map(item => Markup.button.callback(item.emoji, 'emoji:' + item.name));
  const line2 = data.slice(3, 6).map(item => Markup.button.callback(item.emoji, 'emoji:' + item.name));
  return Markup.inlineKeyboard([
    line1,
    line2
  ])
}

module.exports = {
    startMenu,
    bloggersListMenu,
    goHomeMenu,
    voteMenu,
    voteBackMenu,
    emojiMenu,
    bloggersMenu
}