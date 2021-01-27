const express = require('express')
const route = express.Router()

const {
  createHistory,
  readHistory,
  detailHistory,
  updateHistory,
  patchHistory,
  deleteHistory
} = require('../controllers/c_history')

// authentication
const {
  authentication, 
  authorizationAdmin,
  authorizationCashier
} = require('../helpers/middleware/auth')

// redis
const {getAllHistory} = require('../helpers/redis/redisAll')

route
  .post('/history', authentication, createHistory) // access to admin and cashier 
  .get('/history', authentication, authorizationAdmin, getAllHistory, readHistory) // access to admin
  .get('/history/:id', authentication, authorizationCashier, detailHistory) // access to cashier
  .put('/history/:id', authentication, updateHistory) // access to admin and cashier 
  .patch('/history/:id', authentication, patchHistory) // access to admin and cashier 
  .delete('/history/:id', authentication, deleteHistory) // access to admin and cashier 
  
module.exports = route