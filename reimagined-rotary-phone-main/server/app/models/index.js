/**
 * @fileoverview This module sets up the Sequelize database connection and defines models for products, checkout, and users.
 * @module db
 */

const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");

/**
 * The Sequelize instance used to connect to the database.
 * @type {Sequelize}
 */
const connex = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  port: dbConfig.PORT,
  operatorAliases: false,
});

const db = {};

db.Sequelize = Sequelize;
db.connex = connex;

/**
 * The Sequelize model for products.
 * @type {Model}
 */
db.products = require("./product.model.js")(connex, Sequelize);

/**
 * The Sequelize model for checkout.
 * @type {Model}
 */
db.checkout = require("./checkout.model.js")(connex, Sequelize);

/**
 * The Sequelize model for users.
 * @type {Model}
 */
db.users = require("./user.model.js")(connex, Sequelize);

module.exports = db;
