/**
 * Define the Sequelize model for products.
 *
 * @param {import('sequelize').Sequelize} connex - The Sequelize instance for the database connection.
 * @param {import('sequelize').Sequelize} Sequelize - The Sequelize library.
 * @returns {import('sequelize').Model} The Product model.
 */
module.exports = (connex, Sequelize) => {
  /**
   * The Product model representing products in the database.
   * @type {import('sequelize').Model}
   */
  const Product = connex.define("product", {
    name: {
      type: Sequelize.STRING,
    },
    photo: {
      type: Sequelize.STRING,
    },
    price: {
      type: Sequelize.REAL,
    },
    description: {
      type: Sequelize.TEXT,
    },
    type: {
      type: Sequelize.STRING,
    },
    rating: {
      type: Sequelize.INTEGER,
    },
    stock: {
      type: Sequelize.INTEGER,
    },
  } );

  return Product;
};
