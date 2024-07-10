/**
 * Database configuration object.
 * @typedef {Object} DbConfig
 * @property {string} HOST - The hostname or IP address of the database server.
 * @property {number} PORT - The port number for the database server.
 * @property {string} USER - The username for connecting to the database.
 * @property {string} PASSWORD - The password for connecting to the database.
 * @property {string} DB - The name of the database.
 * @property {string} dialect - The type of database (e.g., "mysql").
 */
require("dotenv").config();
/**
 * Database configuration settings.
 * @type {DbConfig}
 */
module.exports = {
  HOST: process.env.DB_HOST,    // Provide default values
  PORT: process.env.DB_PORT || 3306, 
  dialect: "mysql",
  USER: process.env.DB_USER || 'admin',
  PASSWORD: process.env.DB_PASSWORD,
  DB: process.env.DB_DATABASE || 'ecommerce_db'
};