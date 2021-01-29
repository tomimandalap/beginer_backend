const {
  login, 
  register,
  readAllUser,
  detailUser,
  updatePutUser,
  deleteUser
} = require('../controllers/c_user')

const express = require('express')

const routers = express.Router()

routers
  .post('/login', login)
  .post('/register', register)
  .get('/user', readAllUser)
  .get('/user/:id', detailUser)
  .put('/user/:id', updatePutUser)
  .delete('/user/:id', deleteUser)

module.exports = routers
