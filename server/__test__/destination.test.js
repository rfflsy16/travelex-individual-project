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


describe('GET /home', () => {
    describe('GET /home - succeed', () => {
        it('should be return data of destination', async () => {
            const response = await request(app)
                .get('/home/')
                .set('Authorization', `Bearer ${access_token}`)

            expect(response.status).toBe(200)
            expect(response.body).toHaveProperty('destination', expect.any(Array))
        })
    })
    describe('GET /home - failed', () => {
        it('should be return an error message because not login', async () => {
            const response = await request(app)
                .get('/home/')

            expect(response.status).toBe(401)
            expect(response.body.message).toBe('Please login first')
        })
    })
})

// post destination
describe('POST /home', () => {
    describe('POST /home - succeed', () => {
        it('should be return an message Success create new Destination', async () => {
            const response = await request(app)
                .post('/home/')
                .set('Authorization', `Bearer ${access_token}`)
                .send({
                    name: 'Pantai Pangalengan',
                    location: 'Garut',
                    description: 'Sangat keren sekali bang',
                    rating: 4.5
                })

            expect(response.status).toBe(200)
            expect(response.body.message).toBe('Success create new Destination')
            expect(response.body).toHaveProperty('destination', expect.any(Object))
        })
    })
    describe('POST /home - failed', () => {
        it('should be return an error message because not login', async () => {
            const response = await request(app)
                .post('/home/')
                .send({
                    name: 'Pantai Pangalengan',
                    location: 'Garut',
                    description: 'Sangat keren sekali bang',
                    rating: 4.5
                })

            expect(response.status).toBe(401)
            expect(response.body.message).toBe('Please login first')
        })
    })
    describe('POST /home - failed', () => {
        it('should be return an error message because body is required', async () => {
            const response = await request(app)
                .post('/home/')
                .set('Authorization', `Bearer ${access_token}`)
                .send({
                    name: 'Pantai Pangalengan',
                    location: '',
                    description: 'Sangat keren sekali bang',
                    rating: 4.5
                })

            expect(response.status).toBe(400)
            expect(response.body.message).toBe('location is required')
        })
    })
    describe('POST /home - failed', () => {
        it('should be return an error message because  body is required', async () => {
            const response = await request(app)
                .post('/home/')
                .set('Authorization', `Bearer ${access_token}`)
                .send({
                    name: 'Pantai Pangalengan',
                    location: 'Garut',
                    description: '',
                    rating: 4.5
                })

            expect(response.status).toBe(400)
            expect(response.body.message).toBe('description is required')
        })
    })
    describe('POST /home - failed', () => {
        it('should be return an error message because  body is required', async () => {
            const response = await request(app)
                .post('/home/')
                .set('Authorization', `Bearer ${access_token}`)
                .send({
                    name: '',
                    location: 'Garut',
                    description: 'Sangat keren sekali bang',
                    rating: 4.5
                })

            expect(response.status).toBe(400)
            expect(response.body.message).toBe('name is required')
        })
    })
})

// delete destination
describe('DELETE /home/:id', () => {
    describe('DELETE /home/:id - succeed', () => {
        it('should be return an message Success delete Destination by id 36', async () => {
            const response = await await request(app)
                .delete('/home/36')
                .set('Authorization', `Bearer ${access_token}`)

            expect(response.status).toBe(200)
            expect(response.body.message).toBe('Success delete Destination by id 36')
        })
    })
    describe('DELETE /home/:id - failed', () => {
        it('should be return an message Data not found', async () => {
            const response = await await request(app)
                .delete('/home/100')
                .set('Authorization', `Bearer ${access_token}`)

            expect(response.status).toBe(404)
            expect(response.body.message).toBe('Data not found')
        })
    })
})