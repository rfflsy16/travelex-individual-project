const router = require('express').Router()
const destinationController = require('../controllers/destinationController')

router.get('/', destinationController.read)


module.exports = router