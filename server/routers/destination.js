const router = require('express').Router()
const destinationController = require('../controllers/destinationController')
const { checkAdmin, checkStaffUserOrAdmin } = require('../middlewares/authorization')

router.get('/', destinationController.read)
router.get('/recomendation', destinationController.recomendation)

router.use(checkAdmin)
router.post('/', destinationController.add)
router.delete('/:id', destinationController.delete)


module.exports = router