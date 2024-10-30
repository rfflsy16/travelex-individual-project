const { Wishlist, User } = require('../models')
const checkAdmin = async (req, res, next) => {
    try {
        console.log(req.loginInfo)
        const { role } = req.loginInfo

        if (role !== 'admin') throw { name: 'Forbidden' }

        next()
    } catch (err) {
        next(err)
    }
}

const checkStaffUserOrAdmin = async (req, res, next) => {
    const { role, userId } = req.loginInfo;
    try {
        if (role === 'user') {
            const { id } = req.params;

            const wishlist = await Wishlist.findByPk(id);
            if (!wishlist) throw { name: 'NotFound' };

            if (wishlist.user_id !== userId) throw { name: 'Forbidden' };
        }
        next();
    } catch (error) {
        console.error(error);
        next(error);
    }
};


module.exports = { checkAdmin, checkStaffUserOrAdmin }