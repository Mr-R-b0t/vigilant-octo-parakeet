const db = require('../models')
const Product = db.products
const OP = db.Sequelize.Op

/**
 * Find and return all products from the database.
 *
 * @param {import('express').Request} req - The Express request object.
 * @param {import('express').Response} res - The Express response object.
 */
exports.findAll = (req, res) => {
    Product.findAll()
    .then(data => {
        res.status(200).send(data)
    })
    .catch(e => {
        res.status(500).send({
            message: 'Could not retrieve data'
        })
    })
}
/**
 * Create a new product in the database.
 *
 * @param {import('express').Request} req - The Express request object.
 * @param {import('express').Response} res - The Express response object.
 */
exports.create = (req, res) => {
    //console.log(req.body)
    if(!req.body.name || !req.body.price || !req.body.description || !req.body.image){
        res.status(500).send({
            message: 'Missing data'
        })
        return
    }

    Product.create(req.body)
        .then(data => {
            res.status(200).send(data)
        })
        .catch(e => {
            res.status(500).send({
                message: 'Could not insert into the table'
            })
        })
}
/**
 * Find a product by its ID.
 *
 * @param {import('express').Request} req - The Express request object.
 * @param {import('express').Response} res - The Express response object.
 */
exports.findOne = (req, res) => {
    const id = req.params.id
    Product.findByPk(id)
    .then(data => {
        if(data){
            res.status(200).send(data)
        }
        else {
            res.status(500).send({
                message: 'Could not find the data'
            })
        }
    })
    .catch(e => {
        res.status(500).send({
            message: 'Could not find the data'
        })
    })

}
/**
 * Delete a product by its ID.
 *
 * @param {import('express').Request} req - The Express request object.
 * @param {import('express').Response} res - The Express response object.
 */
exports.delete = (req, res) => {
    const id = req.params.id
    Product.destroy({
        where: {id : id}
    })
    .then( num => {
        if(num == 1 ){
            res.status(200).send({
                message: 'Product was deleted'
            })
        }else {
            res.status(500).send({
                message: "Could not delete"
            })
        }
    })
    .catch(e => {
        res.status(500).send({
            message: 'Database error'
        })
    })
}
/**
 * Update a product by its ID.
 *
 * @param {import('express').Request} req - The Express request object.
 * @param {import('express').Response} res - The Express response object.
 */
exports.update = (req, res) => {
    const id = req.params.id
    Product.update(req.body, {
        where: {id: id}
    })
    .then( num => {
        if(num == 1 ){
            res.status(200).send({
                message: 'Product was updated'
            })
        }else {
            res.status(500).send({
                message: "Could not update"
            })
        }
    })
    .catch(e => {
        res.status(500).send({
            message: 'Database error'
        })
    })
}
