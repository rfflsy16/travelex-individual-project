const router = require('express').Router()
const UserController = require('../controllers/userController')
const authentication = require('../middlewares/authentication')
const { checkAdmin, checkStaffUserOrAdmin } = require('../middlewares/authorization')
const upload = require('../middlewares/multer')
const uploadMiddleWare = upload.single('imgUrl')

router.post('/register', UserController.register)
router.post('/login', UserController.login)
router.post('/google/login', UserController.googleLogin)
router.patch('/profile/:id', uploadMiddleWare, authentication, checkStaffUserOrAdmin, UserController.upload)

module.exports = router