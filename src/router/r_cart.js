const express = require('express')
const route = express.Router()

const {createCart, readCart, detailCart, updateCart, deleteIdCart, deleteInvoicesCart} = require('../controllers/c_cart')

route
  .post('/cart', createCart)
  .get('/cart', readCart)
  .get('/cart/:id', detailCart)
  .put('/cart/:id', updateCart)
  // .delete('/cart/:id', deleteIdCart)
  .delete('/cart/:invoices', deleteInvoicesCart)

module.exports = route