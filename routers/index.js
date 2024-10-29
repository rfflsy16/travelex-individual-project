const router = require('express').Router()
const UserController = require('../controllers/userController')
const authentication = require('../middlewares/authentication')

router.post('/register', UserController.register)
router.post('/login', UserController.login)
router.post('/google/login', UserController.googleLogin)


module.exports = router