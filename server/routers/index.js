const router = require('express').Router()
const user = require('./user')
const destination = require('./destination')
const wishlist = require('./wishlist')

const authentication = require('../middlewares/authentication')


router.use('/user', user)
router.use(authentication)
router.use('/home', destination)
router.use('/wishlists', wishlist)


module.exports = router