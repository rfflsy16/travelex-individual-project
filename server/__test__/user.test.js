const request = require('supertest')
const app = require('../app')

const { hash } = require('../helpers/bcrypt')
const { sequelize } = require('../models')
const { User } = require('../models');  // Model Sequelize User
const cloudinary = require('cloudinary').v2;
const queryInterface = sequelize.getQueryInterface()
const { signToken, verifyToken } = require('../helpers/jwt')

let users = require('../data/user.json')


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
})

afterAll(async () => {
    await queryInterface.bulkDelete('Users', null, { truncate: true, cascade: true, restartIdentity: true })
})


// register
describe('POST /register', () => {
    describe('POST /register - succeed', () => {
        it('should be return message and data of user', async () => {
            const response = await request(app)
                .post('/user/register')
                .send({
                    username: 'mamang',
                    email: 'testing1@mail.com',
                    password: '123456',
                    imgUrl: 'https://randomuser.me/api/portraits/women/2.jpg'
                })
            expect(response.status).toBe(201)
            expect(response.body.message).toBe('Success Regist Account')
        })
    })
    describe('POST /register - failed', () => {
        it('should be return error message an email must be unique because add same email', async () => {
            const response = await request(app)
                .post('/user/register')
                .send({
                    username: 'mamang',
                    email: 'testing1@mail.com',
                    password: '123456',
                    imgUrl: 'https://randomuser.me/api/portraits/women/2.jpg'
                })
            expect(response.status).toBe(400)
            expect(response.body.message).toBe('email must be unique')
        })
    })
    describe('POST /register - failed', () => {
        it('should be return error message an email is required', async () => {
            const response = await request(app)
                .post('/user/register')
                .send({
                    username: 'mamang',
                    email: '',
                    password: '123456',
                    imgUrl: 'https://randomuser.me/api/portraits/women/2.jpg'
                })
            expect(response.status).toBe(400)
            expect(response.body.message).toBe('email is required')
        })
    })
    describe('POST /register - failed', () => {
        it('should be return error message an password is required', async () => {
            const response = await request(app)
                .post('/user/register')
                .send({
                    username: 'mamang',
                    email: 'testing1@mail.com',
                    password: '',
                    imgUrl: 'https://randomuser.me/api/portraits/women/2.jpg'
                })
            expect(response.status).toBe(400)
            expect(response.body.message).toBe('password is required')
        })
    })
    describe('POST /register - failed', () => {
        it('should be return error message an username is required', async () => {
            const response = await request(app)
                .post('/user/register')
                .send({
                    username: '',
                    email: 'testing1@mail.com',
                    password: '123456',
                    imgUrl: 'https://randomuser.me/api/portraits/women/2.jpg'
                })
            expect(response.status).toBe(400)
            expect(response.body.message).toBe('username is required')
        })
    })
    describe('POST /register - failed', () => {
        it('should be return error message an Profile Picture is required', async () => {
            const response = await request(app)
                .post('/user/register')
                .send({
                    username: 'mamang',
                    email: 'testing1@mail.com',
                    password: '123456',
                    imgUrl: ''
                })
            expect(response.status).toBe(400)
            expect(response.body.message).toBe('Profile Picture is required')
        })
    })
})



// post login

describe('POST /login', () => {
    describe('POST /login - succeed', () => {
        it('should be return access_token', async () => {
            const response = await request(app)
                .post('/user/login')
                .send({
                    email: 'john@example.com',
                    password: 'password123'
                })
            expect(response.status).toBe(200)
            expect(response.body).toHaveProperty('access_token', expect.any(String))
        })
    })
    describe('POST /login - failed', () => {
        it('should be return invalid message', async () => {
            const response = await request(app)
                .post('/user/login')
                .send({
                    email: 'john@example.com',
                    password: ''
                })
            expect(response.status).toBe(400)
            expect(response.body.message).toBe('Invalid email or password')
        })
    })
    describe('POST /login - failed', () => {
        it('should be return invalid message', async () => {
            const response = await request(app)
                .post('/user/login')
                .send({
                    email: '',
                    password: 'password123'
                })
            expect(response.status).toBe(400)
            expect(response.body.message).toBe('Invalid email or password')
        })
    })
    describe('POST /login - failed', () => {
        it('should be return invalid message', async () => {
            const response = await request(app)
                .post('/user/login')
                .send({
                    email: 'john@example.com',
                    password: 'password1234567897543'
                })
            expect(response.status).toBe(400)
            expect(response.body.message).toBe('Invalid email or password')
        })
    })
})


// patch profile image

jest.spyOn(cloudinary.uploader, 'upload').mockResolvedValue({
    secure_url: 'https://res.cloudinary.com/demo/image/upload/v12345/sample.jpg'
});

describe('PATCH /profile/:id', () => {
    afterAll(() => {
        jest.restoreAllMocks();
    });

    describe('PATCH /profile/:id - success', () => {
        it('should return the photo URL that was uploaded to Cloudinary', async () => {
            const response = await request(app)
                .patch(`/user/profile/3`)
                .set('Authorization', `Bearer ${access_token}`)
                .attach('imgUrl', Buffer.from('sample-image-data'), 'test-image.jpg');

            expect(response.status).toBe(201);
            expect(response.body).toHaveProperty('message', `Success upload Profile Picture id 3`);
            expect(response.body).toHaveProperty('imgUrl', 'https://res.cloudinary.com/demo/image/upload/v12345/sample.jpg');
            expect(cloudinary.uploader.upload).toHaveBeenCalled();
        });
    });
    describe('PATCH /profile/:id - success', () => {
        it('should return 401 because user not login', async () => {
            const response = await request(app)
                .patch(`/user/profile/3`)
                .attach('imgUrl', Buffer.from('sample-image-data'), 'test-image.jpg');

            expect(response.status).toBe(401);
            expect(response.body).toHaveProperty('message', `Please login first`);
            expect(cloudinary.uploader.upload).toHaveBeenCalled();
        });
    });
});