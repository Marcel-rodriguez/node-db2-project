const express = require("express")
const morgan = require('morgan')
const server = express()

//router
const carsRouter = require('./cars/cars-router')

server.use(express.json())
server.use(morgan('tiny'))

server.use('/api/cars', carsRouter)

// DO YOUR MAGIC

server.get('/', (req, res) => {
    res.send(`<h1>Server is working let's get these cars in the DB</h1>`)
})

module.exports = server
