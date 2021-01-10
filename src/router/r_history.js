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

route
  .post('/history', createHistory)
  .get('/history', readHistory)
  .get('/history/:id', detailHistory)
  .put('/history/:id', updateHistory)
  .patch('/history/:id', patchHistory)
  .delete('/history/:id', deleteHistory)
  
module.exports = route