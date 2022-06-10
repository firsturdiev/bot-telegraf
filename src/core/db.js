/* eslint-disable no-unused-vars */
const environment = "dev";
const config = require("../knexfile")[environment];
const knex = require("knex")(config);

async function createTableUsers() {
    await knex.schema.hasTable('users').then(function (exists) {
        if (!exists) {
            return knex.schema.createTable('users', function (table) {
                table.increments().primary().unique();
                table.bigint('telegram_id').unique();
                table.string('full_name');
                table.timestamp('joined_date').defaultTo(knex.fn.now());
            });
        }
    });
}

async function createTableBloggers() {
    await knex.schema.hasTable('bloggers').then(async function (exists) {
        if (!exists) {
            await knex.schema.createTable('bloggers', function (table) {
                table.increments().primary().unique();
                table.string('name');
                table.string('video_id');
                table.string('video_caption');
                table.mediumint('votes');
            });

            // Mock data. Must be removed after production
            await addBlogger({
                name: "dili.me",
                video_id: "http://techslides.com/demos/sample-videos/small.mp4",
                video_caption: "dili.me",
                votes: 0
            })
            await addBlogger({
                name: "donik.vines",
                video_id: "http://techslides.com/demos/sample-videos/small.mp4",
                video_caption: "donik.vines",
                votes: 0
            })
        }
    });
}

async function createTableVotes() {
    await knex.schema.hasTable('votes').then(function (exists) {
        if (!exists) {
            return knex.schema.createTable('votes', function (table) {
                table.increments().primary().unique();
                table.integer('user_id');
                table.integer('blogger_id');
                table.unique(['user_id', 'blogger_id']);
            });
        }
    });
}

createTableUsers()
createTableBloggers()
createTableVotes()


async function addUser(data) {
    return knex("users").insert(data);
}

async function oneUser(id) {
    return knex("users").select("*").where({ id: id }).first();
}

async function updateUser(telegram_id, data) {
    return knex("users").update(data).where({ telegram_id: telegram_id });
}

async function editProfile(telegram_id, param) {
    return knex("users").update(param).where({ telegram_id: telegram_id });
}

async function updateStatus(telegram_id, status) {
    return knex("users")
        .update({ status: status })
        .where({ telegram_id: telegram_id });
}

async function deleteUser(telegram_id) {
    return knex("users").where({ telegram_id: telegram_id }).del();
}

async function hasUser(telegram_id) {
    return knex("users").select("*").where({ telegram_id: telegram_id });
}

async function getUsers() {
    return knex("users").select("*");
}

async function search(telegram_id, from, to, gender) {
    return knex("users")
        .select("*")
        .where({ gender: gender })
        .whereBetween("age", [from, to])
        .whereNot({
            telegram_id: telegram_id,
        });
}

async function getUserLang(telegram_id) {
    return knex("users")
        .select("*")
        .where({ telegram_id });
}

// Bloggers

async function oneBlogger(id) {
    return knex("bloggers").select("*").where({ id: id }).first();
}

async function getBloggers() {
    return knex("bloggers").select("*");
}

async function getBloggersSorted() {
    return knex("bloggers").select("*").orderBy("votes", "desc");
}

async function addBlogger(data) {
    return knex("bloggers").insert(data);
}

async function updateBlogger(id, data) {
    return knex("bloggers").update(data).where({ id: id });
}

async function addVote(user_id, blogger_id) {
    return knex("votes").insert({ user_id, blogger_id });
}

async function isVoted(user_id, blogger_id) {
    const user = knex("votes").select("*").where({ user_id, blogger_id }).first();
    return user;
}

async function getVotes() {
    return knex("votes").select("*");
}

module.exports = {
    hasUser,
    addUser,
    oneBlogger,
    getBloggers,
    getBloggersSorted,
    addBlogger,
    addVote,
    updateBlogger,
    getVotes,
    isVoted
};