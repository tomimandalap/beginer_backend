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

route
  .post('/product', creatProduct)
  .get('/product', readAllProduct)
  .get('/product/:id', detailProduct)
  .put('/product/:id', updateProduct)
  .patch('/product/:id', patchProduct)
  .delete('/product/:id', deleteProduct)

module.exports = route