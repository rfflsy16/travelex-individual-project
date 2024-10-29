const { User } = require('../models')
const { compare } = require('../helpers/bcrypt')
const { signToken } = require('../helpers/jwt')
const { OAuth2Client } = require('google-auth-library');

class UserController {
    static async register(req, res, next) {
        try {
            const { username, email, password, role, imgUrl } = req.body
            const user = await User.create({ username, email, password, role, imgUrl })

            res.status(201).json({
                message: 'Success Regist Account',
                user
            })
        } catch (error) {
            // console.log(error)

            // res.status(400).json({
            //     message: error.errors[0].message
            // })
            next(error)
        }
    }

    static async login(req, res, next) {
        try {
            const { email, password } = req.body

            if (!email || !password) throw { name: 'LoginError' }

            const userLogin = await User.findOne({
                where: {
                    email
                }
            })

            console.log(userLogin)

            if (!userLogin) throw { name: 'NotFound' }

            if (!compare(password, userLogin.password)) throw { name: 'LoginError' }

            const payload = {
                id: userLogin.id,
                email: userLogin.email,
                role: userLogin.role
            }

            const access_token = signToken(payload)

            res.status(200).json({
                message: 'Success log in to your account',
                access_token
            })
        } catch (error) {
            console.log(error)
            next(error)
        }
    }
    static async googleLogin(req, res, next) {
        try {
            const { token } = req.headers
            const client = new OAuth2Client()

            const ticket = await client.verifyIdToken({
                idToken: token,
                audience: process.env.GOOGLE_CLIENT_ID
            })

            const payload = ticket.getPayload();

            const [user, created] = await User.findOrCreate({
                where: {
                    username: payload.email
                },
                defaults: {
                    username: payload.email,
                    password: "password_google"
                },
                hooks: false
            })

            const access_token = signToken({
                id: user.id,
                username: user.username,
            })

            res.status(200).json({ access_token })
        } catch (error) {
            console.log(error)
            next(error)
        }
    }
}

module.exports = UserController