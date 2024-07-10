/**
 * Define the 'checkout' model for the database.
 *
 * @param {Object} connex - The Sequelize connection object.
 * @param {Object} Sequelize - The Sequelize module.
 * @returns {Object} - The 'checkout' model.
 */
module.exports = (connex, Sequelize) => {
  /**
   * Represents a checkout entry in the database.
   * @typedef {Object} Checkout
   * @property {string} name - The name of the user making the checkout.
   * @property {string} adress - The user's address for shipping.
   * @property {string} city - The city of the user's address.
   * @property {Date} date - The date of the checkout.
   * @property {number} userID - The ID of the user associated with the checkout.
   * @property {Object} cart - The shopping cart data in JSON format.
   */

  /**
   * The 'checkout' model for the database.
   * @type {Object}
   */
  const checkout = connex.define("checkout", {
    name: {
      type: Sequelize.STRING,
    },
    adress: {
      type: Sequelize.STRING,
    },
    city: {
      type: Sequelize.STRING,
    },
    date: {
      type: Sequelize.DATE,
    },
    userID: {
      type: Sequelize.INTEGER,
    },
    cart: {
      type: Sequelize.JSON,
    },
  });

  return checkout;
};
