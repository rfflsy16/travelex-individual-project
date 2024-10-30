const request = require('supertest')
const app = require('../app')

const { hash } = require('../helpers/bcrypt')
const { sequelize } = require('../models')
const queryInterface = sequelize.getQueryInterface()

let users = require('../data/user.json')


beforeAll(async () => {
    users.forEach(el => {
        delete el.id
        el.password = hash(el.password)
        el.updatedAt = el.createdAt = new Date()
    })
    await queryInterface.bulkInsert('Users', users, {})
})

afterAll(async () => {
    await queryInterface.bulkDelete('Users', null, { truncate: true, cascade: true, restartIdentity: true })
})

// post login

describe('POST /login', () => {
    describe('POST /login - succeed', () => {
        it('should be return access_token', async () => {
            const response = await request(app)
                .post('/login')
                .send({
                    email: 'john@example.com',
                    password: 'password123'
                })
        })
    })
})