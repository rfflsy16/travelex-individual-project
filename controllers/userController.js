const e = require('express')
const { User } = require('../models')
const { where } = require('sequelize')
const { compare } = require('../helpers/bcrypt')

class UserController {
    static async register(req, res, next) {
        try {
            const { username, email, password, role } = req.body
            const user = await User.create({ username, email, password, role })

            res.status(201).json({
                message: 'Success Regist Account',
                user
            })
        } catch (error) {
            console.log(error)

            res.status(400).json({
                message: error.errors[0].message
            })
            // next(error)
        }
    }

    static async login(req, res, next) {
        try {
            const { email, password } = req.body

            if (!email || !password) throw { name: 'InvalidLogin' }

            const userLogin = await User.findOne({
                where: {
                    email
                }
            })

            console.log(userLogin)

            if (!userLogin) throw { name: 'notFound' }

            if (!compare(password, userLogin.password)) throw { name: 'LoginError' }

            const payload = {
                id: userLogin.id,
                email: userLogin.email,
                role: userLogin.role
            }

        } catch (error) {
            console.log(error)
        }
    }
    static async googleLogin(req, res, next) {
        try {

        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = UserController