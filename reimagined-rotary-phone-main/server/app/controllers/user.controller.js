const db = require('../models')
const userModel = require('../models/user.model')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = db.users
//const OP = db.Sequelize.Op
const https = require('http')
/**
 * Find and return all users in the database.
 *
 * @param {import('express').Request} req - The Express request object.
 * @param {import('express').Response} res - The Express response object.
 */
exports.findAll = (req, res) => {
    User.findAll()
    .then(data => {
        res.send(data)
    })
}
/**
 * Create a new user in the database.
 *
 * @param {import('express').Request} req - The Express request object.
 * @param {import('express').Response} res - The Express response object.
 */
exports.create = async (req, res) => {
    if (!req.body.nickname || !req.body.email || !req.body.password) {
        res.status(400).send({
            message: "User must have name, email and password !"
        })
        return;
    }
    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(req.body.password, salt)
    await User.create({
        nickname : req.body.nickname,
        email : req.body.email,
        password : hashPassword,
        isAdmin : false,
        isBanned : false
    })
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message: 'Could not insert the data'
            })
        })
}
/**
 * Find a user by email and authenticate with the provided password. If successful, generate and set a JWT cookie.
 *
 * @param {import('express').Request} req - The Express request object.
 * @param {import('express').Response} res - The Express response object.
 * @param {import('express').NextFunction} next - The Express next middleware function.
 */
exports.findOne = async (req, res, next) => {
  const user = await User.findOne({ where: { email: req.body.email } });

  if (!user) {
    return res.status(400).send({
      message: "email not found",
    });
  }
  if (!(await bcrypt.compare(req.body.password, user.password))) {
    return res.status(400).send({
      message: "password incorrect",
    });
  }
  const token = jwt.sign({ id: user.id }, "secret");
  // console.log(token)
  //withCredentials = true on the client side (http)
  res.cookie("jwt", token, {
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000,
  });
  user.update({
    token: token,
  });
  const { password, ...data } = await user.toJSON();
  res.send({
    token: token,
    user: data,
  });
}
    
/**
 * Authenticate a user using a JWT cookie. Return user data if authenticated.
 *
 * @param {import('express').Request} req - The Express request object.
 * @param {import('express').Response} res - The Express response object.
 */
exports.auth = async (req, res) => {
        try {
            const cookie = req.cookies['jwt']
            const claims = jwt.verify(cookie, 'secret')
            if (!claims) {
                return res.status(401).send({
                    message: 'unauthenticated'
                })
            }
            const user = await User.findOne({id: claims.id})
            const {password, ...data} = await user.toJSON()
            //console.log(data)
            res.send(data)
        } catch (e) {
            return res.status(200).send({
                message: 'authenticated'
            })
        }
}
/**
 * Log out a user by clearing the JWT cookie.
 *
 * @param {import('express').Request} req - The Express request object.
 * @param {import('express').Response} res - The Express response object.
 */
exports.logout = async (req, res) => {
    if (!req.cookies['jwt']) {
        return res.status(401).send({
            message: 'No cookie found'
        })
    }
    res.cookie('jwt', '', {maxAge: 0})

    return res.status(200).send({
        message: 'Logged out'
    })

}
/**
 * Delete a user by their ID.
 *
 * @param {import('express').Request} req - The Express request object.
 * @param {import('express').Response} res - The Express response object.
 */
exports.delete = (req, res) => {
    const id = req.params.id
    User.destroy({
        where: {id : id}
    })
    .then( num => {
        if(num == 1 ){
            return res.status(200).send({
                message: 'User was deleted'
            })
        }else {
            res.status(400).send({
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
 * Update user information.
 *
 * @param {import('express').Request} req - The Express request object.
 * @param {import('express').Response} res - The Express response object.
 */
exports.update = async (req, res) => {
    const id = req.params.id
    const user = await User.findByPk(id)
    if(!user){
        return res.status(400).send({
            message: 'User not found'
        })
    }
    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(req.body.password, salt)
    await user.update({
        nickname : req.body.nickname,
        email : req.body.email,
        password : hashPassword,
        isAdmin : req.body.isAdmin,
        isBanned : req.body.isBanned

    })
    res.status(200).send({
      message: "User was updated",
    });
}
/**
 * Update the banned status of a user.
 *
 * @param {import('express').Request} req - The Express request object.
 * @param {import('express').Response} res - The Express response object.
 */
exports.updateBanned = async (req, res) => {
    const id = req.params.id
    const user = await User.findByPk(id)
    if(!user){
        return res.status(400).send({
            message: 'User not found'
        })
    }
    await user.update({
        isBanned : req.body.isBanned
    })
    res.status(200).send({
        message: 'Update was updated'
    })
}
/**
 * Update the admin status of a user.
 *
 * @param {import('express').Request} req - The Express request object.
 * @param {import('express').Response} res - The Express response object.
 */
exports.updateAdmin = async (req, res) => {
    const id = req.params.id
    const user = await User.findByPk(id)
    if(!user){
        return res.status(400).send({
            message: 'User not found'
        })
    }
    await user.update({
        isAdmin : req.body.isAdmin
    })
    res.status(200).send({
      message: "User was updated",
    });
}

