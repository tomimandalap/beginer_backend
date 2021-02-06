const express = require('express')
const route = express.Router()

const {
  creatProduct,
  readAllProduct,
  detailProduct,
  updateProduct,
  patchProduct,
  deleteProduct
} = require('../controllers/c_product')

// authentication
const {
  authentication, 
  authorizationAdmin,
  authorizationCashier
} = require('../helpers/middleware/auth')

// redis
const {getAllProduct} = require('../helpers/redis/redis_product')

// multer
const singleUploadimg = require('../helpers/middleware/uploadimg')

route
  .post('/product',authentication, singleUploadimg, creatProduct) // access to admin and cashier
  // .get('/product',authentication, authorizationAdmin, getAllProduct, readAllProduct) // access to admin
  .get('/product',authentication, getAllProduct, readAllProduct) // all access
  .get('/product/:id',authentication, authorizationCashier, detailProduct) // access to cashier
  .put('/product/:id',authentication, singleUploadimg, updateProduct) // access to admin and cashier
  .patch('/product/:id',authentication, patchProduct) // access to admin and cashier
  .delete('/product/:id',authentication, deleteProduct) // access to admin and cashier

module.exports = route
