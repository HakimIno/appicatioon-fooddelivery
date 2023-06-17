
const config = require("./package.json").projectConfig;

module.exports = {
    mongoConfig: {
        connectionUrl: config.mongoConnectionUrl,
        database: "DBSedelivery",
        collections: {
            USERS: "users",
            RESTAURANTS: "restaurants",
            CARTS: "carts",
            FOODS: "foods",
            BOOKMARKS: "bookmarks",
            ORDER: "orders"
        },
    },
    serverConfig: {
        ip: config.serverIp,
        port: config.serverPort,
    },
    tokenSecret: "foodDelivery_secret",
}