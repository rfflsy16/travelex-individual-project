const { Wishlist, User } = require('../models')
const checkAdmin = async (req, res, next) => {
    try {
        // console.log(req.loginInfo)
        const { role } = req.loginInfo

        if (role !== 'admin') throw { name: 'Forbidden' }

        next()
    } catch (err) {
        next(err)
    }
}

const checkStaffUserOrAdmin = async (req, res, next) => {
    const { role, userId } = req.loginInfo
    try {
        // console.log(req.params);
        if (role !== 'admin') {
            const user = await User.findByPk(userId)

            if (!user) throw { name: "Forbidden" }

            const { id } = req.params

            const wishlist = await Wishlist.findByPk(id)

            if (!wishlist) throw { name: 'WishlistNotFound' }

            if (wishlist.user_id !== userId) throw { name: 'notAuthor' }
        }
        next()
    } catch (error) {
        //  console.log(error)
        next(error)
    }
}

module.exports = { checkAdmin, checkStaffUserOrAdmin }