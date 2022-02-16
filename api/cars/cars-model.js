const db = require('../../data/db-config')

const getAll = () => {
  return db('cars')
}

const getById = (id) => {
  return db('cars').where('id', id).first()
}

const create = async (car) => {
  const [ id ] = await db('cars').insert(car)
  return getById(id)
}

const remove = (id) => {
  return db('cars')
  .where("id", id)
  .del()
}


module.exports={
  getAll,
  getById,
  create,
  remove
}