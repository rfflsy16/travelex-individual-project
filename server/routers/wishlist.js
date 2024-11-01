const router = require('express').Router()
const WishlistController = require('../controllers/wishlist')
const { checkStaffUserOrAdmin } = require('../middlewares/authorization')

router.get('/', WishlistController.read)


router.use('/:id', checkStaffUserOrAdmin)
router.post('/', WishlistController.add)
router.patch('/:id', WishlistController.editStatus)
router.delete('/:id', WishlistController.delete)


module.exports = router