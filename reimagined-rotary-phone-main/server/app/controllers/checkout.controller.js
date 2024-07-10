const db = require("../models");
const CheckOut = db.checkout;
const OP = db.Sequelize.Op;

/**
 * Find and return all checkouts from the database.
 *
 * @param {import('express').Request} req - The Express request object.
 * @param {import('express').Response} res - The Express response object.
 */
exports.findAll = (req, res) => {
  CheckOut.findAll().then((data) => {
    res.send(data);
  });
};

/**
 * Create a new checkout entry in the database.
 *
 * @param {import('express').Request} req - The Express request object.
 * @param {import('express').Response} res - The Express response object.
 */
exports.create = (req, res) => {
  console.log(req.body);
  CheckOut.create(req.body)
    .then((data) => {
      res.send(data);
    })
    .catch((e) => {
      res.status(500).send({
        message: "Could not insert into the table",
      });
    });
};

/**
 * Find a checkout entry by its ID.
 *
 * @param {import('express').Request} req - The Express request object.
 * @param {import('express').Response} res - The Express response object.
 */
exports.findOne = (req, res) => {
  const id = req.params.id;
  CheckOut.findByPk(id)
    .then((data) => {
      res.send(data);
    })
    .catch((e) => {
      res.status(500).send({
        message: "Could not find the data",
      });
    });
};

/**
 * Delete a checkout entry by its ID.
 *
 * @param {import('express').Request} req - The Express request object.
 * @param {import('express').Response} res - The Express response object.
 */
exports.delete = (req, res) => {
  const id = req.params.id;
  CheckOut.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Checkout was deleted",
        });
      } else {
        res.send({
          message: "Could not delete",
        });
      }
    })
    .catch((e) => {
      res.status(500).send({
        message: "Database error",
      });
    });
};

/**
 * Update a checkout entry by its ID.
 *
 * @param {import('express').Request} req - The Express request object.
 * @param {import('express').Response} res - The Express response object.
 */
exports.update = (req, res) => {
  const id = req.params.id;
  CheckOut.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "CheckOut was updated",
        });
      } else {
        res.send({
          message: "Could not update",
        });
      }
    })
    .catch((e) => {
      res.status(500).send({
        message: "Database error",
      });
    });
};

/**
 * Find and return all checkouts associated with a specific user.
 *
 * @param {import('express').Request} req - The Express request object.
 * @param {import('express').Response} res - The Express response object.
 */
exports.findCheckOutByUser = (req, res) => {
  const id = req.params.id;
  CheckOut.findAll({ where: { userId: id } })
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((e) => {
      res.status(500).send({
        message: "Could not find the data",
      });
    });
};
