const router = require('express').Router()
const destination = require('./destination')
const wishlist = require('./wishlist')

const UserController = require('../controllers/userController')
const authentication = require('../middlewares/authentication')

router.post('/register', UserController.register)
router.post('/login', UserController.login)
router.post('/google/login', UserController.googleLogin) 

router.use(authentication)
router.use('/destinations', destination)
router.use('/wishlists', wishlist)


module.exports = router