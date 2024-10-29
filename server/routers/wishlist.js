const router = require('express').Router()
const WishlistController = require('../controllers/wishlist')
const { checkStaffUserOrAdmin } = require('../middlewares/authorization')

router.get('/', WishlistController.read)

router.post('/', checkStaffUserOrAdmin, WishlistController.add)

router.use('/:id', checkStaffUserOrAdmin)
router.patch('/:id', WishlistController.editStatus)
router.delete('/:id', WishlistController.delete)


module.exports = router