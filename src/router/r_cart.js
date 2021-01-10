const express = require('express')
const route = express.Router()

const {
  createCart,
  readCart,
  detailCart,
  updateCart,
  patchCart,
  deleteCart
} = require('../controllers/c_cart')

route
  .post('/cart', createCart)
  .get('/cart', readCart)
  .get('/cart/:id', detailCart)
  .put('/cart/:id', updateCart)
  .patch('/cart/:id', patchCart)
  .delete('/cart', deleteCart)

module.exports = route