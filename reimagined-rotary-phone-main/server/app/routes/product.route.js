/**
 * Module for defining product-related routes.
 *
 * @param {import('express').Express} app - The Express application.
 */
module.exports = (app) => {
  const product = require("../controllers/product.controller.js");
  const router = require("express").Router();

  /**
   * Get all product entries.
   */
  router.get("/", product.findAll);

  /**
   * Create a new product entry.
   */
  router.post("/", product.create);

  /**
   * Get a product entry by its ID.
   */
  router.get("/:id", product.findOne);

  /**
   * Delete a product entry by its ID.
   */
  router.delete("/:id", product.delete);

  /**
   * Update a product entry by its ID.
   */
  router.put("/:id", product.update);

  // Register the router under the '/api/product' route.
  app.use("/api/product", router);
};
