const express = require('express')
const route = express.Router()

const {
  creatCategory,
  readAllCategory,
  detailCategory,
  updateCategory,
  patchCategory,
  deleteCategory
} = require('../controllers/c_category')

// authentication
const {
  authentication, 
  authorizationAdmin,
  authorizationCashier
} = require('../helpers/middleware/auth')

// redis
const {getAllCategory} = require('../helpers/redis/redis_category')

route
  .post('/category', authentication, creatCategory) // access to admin and cashier 
  // .get('/category', authentication, authorizationAdmin, getAllCategory, readAllCategory) // access to admin
  .get('/category', authentication, getAllCategory, readAllCategory) // all access
  .get('/category/:category', authentication, authorizationCashier, detailCategory) // access to cashier
  .put('/category/:category', authentication, updateCategory) // access to admin and cashier
  .patch('/category/:category', authentication, patchCategory) // access to admin and cashier
  .delete('/category/:category', authentication, deleteCategory) // access to admin and cashier
module.exports = route
