const { User, Destination, Wishlist } = require('../models')

class DestinationController {
    static async read(req, res, next) {
        try {
            const destination = await Destination.findAll()
            res.status(200).json({
                destination
            })
        } catch (error) {
            console.log(error)
            next(error)
        }
    }
    static async add(req, res, next) {
        try {
            const { name, location, description } = req.body
            const destination = await Destination.create({
                name, location, description
            })
            res.status(200).json({
                message: 'Success create new Destination',
                destination
            })
        } catch (error) {
            console.log(error)
            next(error)
        }
    }
    static async delete(req, res, next) {
        try {
            const { id } = req.params
            let destination = await Destination.findByPk(id)

            if (!destination) throw {name: 'NotFound'}

            await Destination.destroy({
                where: {
                    id
                }
            })
            
            res.status(200).json({
                message: `Success delete Destination by id ${id}`
            })
        } catch (error) {
            console.log(error)
            next(error)
        }
    }
}

module.exports = DestinationController