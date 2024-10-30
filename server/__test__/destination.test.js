const request = require('supertest')
const app = require('../app')

const { hash } = require('../helpers/bcrypt')
const { sequelize } = require('../models')
const queryInterface = sequelize.getQueryInterface()
const { signToken, verifyToken } = require('../helpers/jwt')

let users = require('../data/user.json')
let destination = require('../data/destination.json')


let access_token, access_token_user;
beforeAll(async () => {
    users.forEach(el => {
        delete el.id
        el.password = hash(el.password)
        el.updatedAt = el.createdAt = new Date()

        return el
    })
    await queryInterface.bulkInsert('Users', users, {})

    const admin = {
        id: 1,
        email: 'john@example.com',
        role: 'admin'
    }

    const user = {
        id: 4,
        email: 'test@mail.com',
        role: 'user'
    }

    access_token = signToken(admin)
    access_token_user = signToken(user)

    // destination
    destination.forEach(el => {
        delete el.id
        el.updatedAt = el.createdAt = new Date()

        return el
    })

    await queryInterface.bulkInsert('Destinations', destination, {})
})

afterAll(async () => {
    await queryInterface.bulkDelete('Users', null, { truncate: true, cascade: true, restartIdentity: true })
    await queryInterface.bulkDelete('Destinations', null, { truncate: true, cascade: true, restartIdentity: true })
})