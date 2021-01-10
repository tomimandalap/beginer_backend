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
  .get('/category/:code', detailCategory)
  .put('/category/:code', updateCategory)
  .patch('/category/:code', patchCategory)
  .delete('/category/:code', deleteCategory)
module.exports = route