const {
  login, 
  register
} = require('../controllers/c_user')

const express = require('express')

const routers = express.Router()

routers
  .post('/login', login)
  .post('/register', register)

module.exports = routers
