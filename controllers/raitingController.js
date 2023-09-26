const ApiError = require("../error/ApiError");
const { Raiting } = require("../models/models");




class RaitingController{
    async addRate(req, res, next){
        try{
            const {userId, deviceId, rate} = req.body
            const raiting = await Raiting.create({rate, userId, deviceId})
            return res.json(raiting)
        }catch(e){
            next(ApiError.badRequest(e.message))
        }
    }

    async getRaiting(req, res, next){
        try{
            const {deviceId} = req.params
            const rates = await Raiting.findAll({where: {deviceId}})
            const raitingValues = rates.map(data => data.rate)
            const sumOfRates = raitingValues.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
            const NumberOfRates = raitingValues.length
            const raiting = sumOfRates/NumberOfRates
            const raitingRounded = Number(raiting.toFixed(2));
            return res.json(raitingRounded)
        }catch(e){
            next(ApiError.badRequest(e.message))
        }
    }
}

module.exports = new RaitingController()