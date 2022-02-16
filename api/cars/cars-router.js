const express = require('express')

const {
    checkCarId,
    checkCarPayload,
    checkVinNumberUnique,
    checkVinNumberValid
} = require('./cars-middleware')

const carsModel = require('./cars-model')
const carsRouter = express.Router()

carsRouter.get('/', (req, res, next) => {
    carsModel.getAll()
    .then(cars => {
        res.status(200).json(cars)
    }).catch(next)
})

carsRouter.get('/:id', checkCarId, (req, res, next) => {
    carsModel.getById(req.params.id)
    .then(car => {
        res.status(200).json(car)
    }).catch(next)
})

carsRouter.post('/', checkCarPayload, checkVinNumberUnique, checkVinNumberValid, (req, res, next) => {
    carsModel.create(req.body)
    .then(newCar => {
        res.status(201).json(newCar)
    }).catch(next)
})

carsRouter.delete('/:id', checkCarId, async (req, res, next) => {
    const id = req.params.id
    try{
        const car = await carsModel.getById(id)
        const removeCar = await carsModel.remove(id)

        const deletedCar = {
            ...car,
            message: `Car ${id} has been deleted!`
        }

        res.status(200).json(deletedCar)

    } catch(err) {
        next(err)
    }
})


carsRouter.use((err, req, res, next) => {
    res.status(err.status || 500).json({
        custom: `Oops something went wrong in carsRouter!`,
        message: err.message,
        stack: err.stack
    })
})


module.exports = carsRouter