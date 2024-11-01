const { where } = require('sequelize')
const { User, Destination, Wishlist } = require('../models')

class WishlistController {
    static async read(req, res, next) {
        try {
            const wishlist = await Wishlist.findAll({
                include: [
                    {
                        model: User,
                        attributes: { exclude: ['password'] }
                    },
                    {
                        model: Destination
                    }
                ]
            })
            res.status(200).json({
                wishlist
            })
        } catch (error) {
            console.log(error)
        }
    }
    static async add(req, res, next) {
        try {
            const { userId } = req.loginInfo

            console.log(userId, 'iniii')

            if (!userId) throw { name: 'NotFound' }

            const { destination_id, category, status } = req.body
            const wishlist = await Wishlist.create({ destination_id, category, status, user_id: userId }, {
                include: [
                    {
                        model: Destination
                    }
                ]
            })

            res.status(201).json({
                message: 'Success add new Wishlist',
                wishlist
            })
        } catch (error) {
            console.log(error)
            next(error)
        }
    }
    static async editStatus(req, res, next) {
        try {
            const { id } = req.params

            const data = await Wishlist.findByPk(id)

            if (!data) throw { name: 'NotFound' }

            const { status } = req.body

            const wishlist = await Wishlist.update({ status }, {
                where: {
                    id
                }
            })

            res.status(201).json({
                message: 'Success update status',
                wishlist
            })
        } catch (error) {
            console.log(error)
        }
    }
    static async delete(req, res, next) {
        try {
            const { id } = req.params

            let wishlist = await Wishlist.findByPk(id)

            if (!wishlist) throw { name: 'NotFound' }

            await Wishlist.destroy({
                where: {
                    id
                }
            })

            res.status(200).json({
                message: `Success delete Wishlist by id ${id}`
            })
        } catch (error) {
            console.log(error)
            next(error)
        }
    }
}

module.exports = WishlistController