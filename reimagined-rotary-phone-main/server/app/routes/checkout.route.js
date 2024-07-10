/**
 * Module for defining checkout-related routes.
 *
 * @param {import('express').Express} app - The Express application.
 */
module.exports = (app) => {
  const checkout = require("../controllers/checkout.controller.js");
  const router = require("express").Router();

  /**
   * Create a new checkout entry.
   */
  router.post("/", checkout.create);

  /**
   * Get all checkout entries.
   */
  router.get("/", checkout.findAll);

  /**
   * Delete a checkout entry by its ID.
   */
  router.delete("/:id", checkout.delete);

  /**
   * Get all checkout entries associated with a specific user.
   */
  router.get("/user/:id", checkout.findCheckOutByUser);

  /**
   * Update a checkout entry by its ID.
   */
  router.put("/:id", checkout.update);
  
  // Register the router under the '/api/checkout' route.
  app.use("/api/checkout", router);
};
