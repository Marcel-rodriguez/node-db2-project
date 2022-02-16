const carsModel = require('./cars-model')
const yup = require('yup')
const vinValidator = require('vin-validator')

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
  mileage: yup.number().required(),
  title: yup.string().trim(),
  transmission: yup.string().trim()
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


const checkVinNumberValid = (req, res, next) => {
    const isValidVin = vinValidator.validate(req.body.vin)
    if(!isValidVin){
      res.status(400).json({message: 'Not a valid vin number'})
    } else {
      next()
    }
}

const checkVinNumberUnique = (req, res, next) => {
  carsModel.getByVin(req.body.vin)
  .then(vin => {
    if(!vin){
      next()
    } else {
      res.status(400).json({message: 'vin must be unique'})
    }
  }).catch(err => {
    console.error(err)
    next(err)
  })
}

module.exports = {
  checkCarId,
  checkCarPayload,
  checkVinNumberUnique,
  checkVinNumberValid
}