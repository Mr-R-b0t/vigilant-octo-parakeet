/**
 * Define the Sequelize model for users.
 *
 * @param {import('sequelize').Sequelize} connex - The Sequelize instance for the database connection.
 * @param {import('sequelize').Sequelize} Sequelize - The Sequelize library.
 * @returns {import('sequelize').Model} The User model.
 */
module.exports = (connex, Sequelize) => {
  /**
   * The User model representing users in the database.
   * @type {import('sequelize').Model}
   */
  const User = connex.define(
    "user",
    {
      nickname: {
        type: Sequelize.STRING,
      },
      email: {
        type: Sequelize.STRING,
      },
      password: {
        type: Sequelize.STRING,
      },
      token: {
        type: Sequelize.STRING,
      },
      isAdmin: {
        type: Sequelize.BOOLEAN,
        defaultValue: false, // Corrected the default value syntax
      },
      isBanned: {
        type: Sequelize.BOOLEAN,
        defaultValue: false, // Corrected the default value syntax
      },
    },
    { timestamps: true }
  );

  return User;
};
