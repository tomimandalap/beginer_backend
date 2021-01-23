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

route
  .post('/category', creatCategory)
  .get('/category', readAllCategory)
  .get('/category/:category', detailCategory)
  .put('/category/:category', updateCategory)
  .patch('/category/:category', patchCategory)
  .delete('/category/:category', deleteCategory)
module.exports = route