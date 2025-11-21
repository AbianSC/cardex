const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: false,

    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.cardex = require("./cardex.model.js")(sequelize, Sequelize);
db.customer = require("./customer.model.js")(sequelize, Sequelize);
db.inquiry  = require("./inquiry.model.js")(sequelize, Sequelize);

// Un Customer tiene muchas Inquiries
db.customer.hasMany(db.inquiry, { foreignKey: { allowNull: false } });
db.inquiry.belongsTo(db.customer);

// Un Car tiene muchas Inquiries
db.cardex.hasMany(db.inquiry, { foreignKey: { allowNull: false } });
db.inquiry.belongsTo(db.cardex);

module.exports = db;