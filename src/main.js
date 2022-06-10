/* eslint-disable no-unused-vars */
const { Markup } = require('telegraf');
const { match } = require('telegraf-i18n');
const bot = require('./core/bot');
const config = require('./utils/config');

const { startMenu, bloggersListMenu, bloggersMenu, goHomeMenu, voteMenu, voteBackMenu, emojiMenu } = require('./utils/keyboards');
const { oneUser, addUser, oneBlogger, getBloggers, getBloggersSorted, addVote, updateBlogger, isVoted } = require('./core/db');
const { isAuth, getRandomEmoji } = require('./utils/helpers');

// Middlewares

bot.use(async (ctx, next) => {
    const user = await isAuth(ctx.from.id);

    if (user) {
        return next();
    }
    else {
        await addUser({
            telegram_id: ctx.from.id,
            full_name: ctx.from.first_name
        });
        return next();
    }
});

// Language

bot.action(/^language/, async ctx => {
    const lang_code = ctx.callbackQuery.data.split(':')[1]
    const message_id = ctx.callbackQuery.message.message_id

    // return ctx.editMessageText(lang_code == 'uz' ? '‼️ Ovoz berish jarayoni 12.06.2022 soat 16:00 dan boshlanadi. Bizni kuzatishda davom eting.': '‼️ Процесс голосования начнется в 12.06.2022 с 16:00 часов. Продолжайте следить за нами.')

    ctx.i18n.locale(lang_code)
    ctx.session.lang = lang_code
    await ctx.answerCbQuery()
    await ctx.deleteMessage(message_id)
    const emoji = getRandomEmoji()
    ctx.session.emoji = emoji.name
    const message = ctx.i18n.t('emoji.select') + ctx.i18n.t(`emoji.${emoji.name}`)
    await ctx.replyWithHTML(message, emojiMenu(emoji))
})

bot.use(async (ctx, next) => {
    if (ctx.session.lang) {
        return next()
    }
    else {
        await ctx.reply('Iltimos, tilni tanlang / Пожалуйста, выберите язык', Markup.inlineKeyboard([
            [Markup.button.callback('🇺🇿 O\'zbekcha', 'language:uz'), Markup.button.callback('🇷🇺 Русский', 'language:ru')]
        ]))
    }
})

// Emoji choosing

bot.action(/^emoji:/, async (ctx) => {
    const emoji = ctx.callbackQuery.data.split(':')[1]
    if (ctx.session.emoji === emoji) {
        ctx.session.verified = true
        await ctx.answerCbQuery(ctx.i18n.t('emoji.verified'));
        await ctx.deleteMessage(ctx.callbackQuery.message.message_id)
        const data = await getBloggers();
        await ctx.reply(ctx.i18n.t('bloggers.list'), bloggersListMenu(data))
    }
    else {
        await ctx.answerCbQuery(ctx.i18n.t('emoji.notVerified'));
        await ctx.deleteMessage(ctx.callbackQuery.message.message_id)
        const emoji = getRandomEmoji()
        ctx.session.emoji = emoji.name
        const message = ctx.i18n.t('emoji.select') + ctx.i18n.t(`emoji.${emoji.name}`)
        await ctx.replyWithHTML(message, emojiMenu(emoji))
    }
})

bot.use(async (ctx, next) => {
    if (ctx.session.verified)
        return next()
    else {
        const emoji = getRandomEmoji()
        ctx.session.emoji = emoji.name
        const message = ctx.i18n.t('emoji.select') + ctx.i18n.t(`emoji.${emoji.name}`)
        await ctx.replyWithHTML(message, emojiMenu(emoji))
    }
})


// Getting video ID

bot.on('video', async (ctx) => {
    if (config.ADMINS.includes(ctx.chat.id)) {
        const file_id = ctx.message.video.file_id
        return ctx.replyWithHTML(`<b>Video ID:</b> <pre>${file_id}</pre>`)
    }
})

// Language

bot.command('lang', async ctx => {
    await ctx.reply('Iltimos, tilni tanlang / Пожалуйста, выберите язык', Markup.inlineKeyboard([
        [Markup.button.callback('🇺🇿 O\'zbekcha', 'language:uz'), Markup.button.callback('🇷🇺 Русский', 'language:ru')]
    ]))
})

bot.start(async ctx => {
    
    
    // const data = await getBloggers();
    // await ctx.reply(ctx.i18n.t('bloggers.list'), bloggersListMenu(data))
})

bot.hears(match('startMenu.bloggers'), async ctx => {
    
    await ctx.reply(ctx.i18n.t('startMenu.bloggers'), bloggersMenu(ctx.i18n))
})

bot.hears(match('startMenu.list'), async ctx => {
    
    const data = await getBloggers();
    const inline = bloggersListMenu(data);
    await ctx.reply(ctx.i18n.t('bloggers.list'), inline);
})

bot.action(/^bloggers/, async ctx => {
    
    await ctx.deleteMessage(ctx.callbackQuery.message.message_id);
    const id = ctx.callbackQuery.data.split(':')[1];
    const blogger = await oneBlogger(id);
    const voted = await isVoted(ctx.from.id, id);

    if (voted) {
        const caption = blogger.video_caption + '\n\n' + ctx.i18n.t('bloggers.voteError');
        await ctx.replyWithVideo(blogger.video_id, {
            caption: caption,
            parse_mode: 'HTML',
            reply_markup: voteBackMenu(ctx.i18n).reply_markup
        })
    } else {
        await ctx.replyWithVideo(blogger.video_id, {
            caption: blogger.video_caption,
            parse_mode: 'HTML',
            reply_markup: voteMenu(ctx.i18n, id).reply_markup
        })
    }

    return ctx.answerCbQuery();
})

bot.action('vote:goBack', async ctx => {
    const data = await getBloggers();
    const inline = bloggersListMenu(data);
    await ctx.deleteMessage(ctx.callbackQuery.message.message_id);
    await ctx.reply(ctx.i18n.t('bloggers.list'), inline);
    return ctx.answerCbQuery();
})

bot.action(/^vote/, async ctx => {
    const id = ctx.callbackQuery.data.split(':')[1];
    const blogger = await oneBlogger(id);
    await addVote(ctx.from.id, id);
    await updateBlogger(id, { votes: blogger.votes + 1 });
    const caption = blogger.video_caption + '\n\n' + ctx.i18n.t('bloggers.voteAlert');
    await ctx.editMessageCaption(caption, voteBackMenu(ctx.i18n))
    return ctx.answerCbQuery(ctx.i18n.t('bloggers.voteAlert'), {
        show_alert: true
    });
})

// bot.command('votes', async ctx => {
//     const bloggers = await getBloggers();
//     const votes = await getVotes();
//     let message = ''
//     for (let blogger of bloggers) {
//         const votesCount = votes.filter(vote => vote.blogger_id === blogger.id).length;
//         message += `${blogger.name} - ${votesCount}\n`
//     }
//     await ctx.reply(message);
// })

// Error handling

bot.catch((err) => {
    console.log(`Bot error: ${err}`);
})


bot.launch()
    .then(() => {
        console.log(`Bot @${bot.botInfo.username} started!`);
    })
    .catch(err => {
        console.log(`Bot start error: ${err}`);
    });
