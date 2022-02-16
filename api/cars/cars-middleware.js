const carsModel = require('./cars-model')
const yup = require('yup')

const checkCarId = (req, res, next) => {
  carsModel.getById(req.params.id)
  .then(car => {
    if(car){
      req.car = car
      next()
    } else {
      next({status: 404, message: `Car with id ${req.params.id} does not exist!`})
    }
  }).catch(next)
}

const carPayloadSchema = yup.object({
  vin: yup.string().trim().min(17).max(17).required(),
  make: yup.string().trim().required(),
  model: yup.string().trim().required(),
  mileage: yup.number().required()
});

const checkCarPayload = async (req, res, next) => {
  try{
    const validPayload = await carPayloadSchema.validate(req.body);
    req.body = validPayload
    next()
  } catch(err) {
    next({status: 400, message: err.message})
  }
}

const validVinSchema = yup.object({
  vin: yup.string().trim().min(17).required()
})

const checkVinNumberValid = async (req, res, next) => {
  try{
    const validVin = await validVinSchema.validate(req.body.vin);
    req.body.vin = validVin
    next()
  } catch(err){
    next({status: 400, message: err.message})
  }
}

const checkVinNumberUnique = async (req, res, next) => {
  try{
    const allCars = await carsModel.getAll()
    allCars.find(car => {
    if(car.vin.includes(req.body.vin)){
      return next({status:400, message: `Vin must be unique`})
    } else {
      next()
    }
  })
  } catch(err){
    next({status:400, message: err.message})
  }
}


module.exports = {
  checkCarId,
  checkCarPayload,
  checkVinNumberUnique,
  checkVinNumberValid
}