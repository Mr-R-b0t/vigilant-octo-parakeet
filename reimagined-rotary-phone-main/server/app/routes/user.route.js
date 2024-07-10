/**
 * Module for defining user-related routes.
 *
 * @param {import('express').Express} app - The Express application.
 */
module.exports = (app) => {
  const user = require("../controllers/user.controller.js");
  const router = require("express").Router();

  /**
   * Create a new user.
   */
  router.post("/", user.create);

  /**
   * Authenticate a user with email and password.
   */
  router.post("/login", user.findOne);

  /**
   * Authenticate and get user information.
   */
  router.get("/auth", user.auth);

  /**
   * Log out a user.
   */
  router.get("/logout", user.logout);

  /**
   * Get all user entries.
   */
  router.get("/", user.findAll);

  /**
   * Delete a user by their ID.
   */
  router.delete("/:id", user.delete);

  /**
   * Get a user by their ID.
   */
  router.get("/:id", user.findOne);

  /**
   * Update the banned status of a user by their ID.
   */
  router.put("/:id", user.updateBanned);

  /**
   * Update a user by their ID.
   */
  router.put("/update/:id", user.update);

  /**
   * Update the admin status of a user by their ID.
   */
  router.put("/admin/:id", user.updateAdmin);

  // Register the router under the '/api/user' route.
  app.use("/api/user", router);
};
