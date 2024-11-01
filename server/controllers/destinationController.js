const { Op, where } = require('sequelize');
const { User, Destination, Wishlist } = require('../models')
const { GoogleGenerativeAI } = require("@google/generative-ai");

class DestinationController {
    static async read(req, res, next) {
        try {
            const { search } = req.query

            const where = {}

            if (search) {
                where.name = {
                    [Op.iLike]: `%${search}%`
                }
            }

            const destination = await Destination.findAll({ where })
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
            const { name, location, description, rating, imgUrl, latitude, longitude } = req.body
            const destination = await Destination.create({
                name, location, description, rating, imgUrl, latitude, longitude
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

            if (!destination) throw { name: 'NotFound' }

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

    static async recomendation(req, res, next) {
        try {
            const genAI = new GoogleGenerativeAI(process.env.API_KEY);
            const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

            const promptBeach = "Kasih saya 10 rekomendasi destinasi apa yang paling ngehits ini di kategori pantai, gunung, pulau, kota wisata, Sejarah & budaya, Petualangan, Taman Nasional, Kuliner, setiap kali anda mengirim, jangan kirimkan yang sama dan tolong kelompokan berdasarkan kategori di atas dan berikan dalam bentuk json tanpa tag json dan tanpa enter";
            const resultBeach = await model.generateContent(promptBeach);
            const responseBeach = await resultBeach.response;
            const text = JSON.parse(responseBeach.text());
            console.log(text);

            res.status(200).json({
                message: 'Our Recommendation destination on every category',
                text,
            })
        } catch (error) {
            next(error)
        }
    }
}

module.exports = DestinationController