const { 
    DATABASE_HOST,
    DATABASE_USER,
    DATABASE_PASS,
    DATABASE_NAME,
    DATABASE_PORT
} = require('./utils/config');

module.exports = {
    dev: {
        client: "mysql2",
        connection: {
            host: DATABASE_HOST,
            user: DATABASE_USER,
            password: DATABASE_PASS,
            database: DATABASE_NAME,
            port: DATABASE_PORT
        },
    },
    DATABASE_NAME,
    DATABASE_USER,
    DATABASE_PASS,
    DATABASE_HOST,
    DATABASE_PORT,
};