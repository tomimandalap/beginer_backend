const {
  modelCreateHistory,
  modelReadHistory,
  modelDetailHistory,
  modelUpdateHistory,
  modelPatchHistory,
  modelDeleteHistory
} = require('../models/m_history')

module.exports = {

  // Create
  createHistory: (req, res) => {
    const data = req.body

    modelCreateHistory(data)
    .then((response) => {
      res.json({
        message: "Create data history success"
      })
    })
    .catch((error) => {
      console.log(error.message)
      res.status(500).send({
        message: error.message
      })
    })
  },

  // Read
  readHistory: (req,res) => {

    // order && metode (ASC, DESC)
    const order = req.query.order
    const metode = req.query.metode
    const data = order ? `ORDER BY ${order} ${metode}` : ``

    // pagination
    const page = req.query.page
    const limit = req.query.limit
    const start = page===1 ? 0 : (page-1)*limit
    const pages = page ? `LIMIT ${start}, ${limit}` : ``

    modelReadHistory(data, pages)
    .then((response) => {
      if(response.length > 0){
        res.json(response)
      } else {
        res.json({
          message: "Data not found"
        })
      }
    })
    .catch((error) => {
      console.log(error.message)
      res.status(500).send({
        message: error.message
      })
    })
  },

  detailHistory: (req, res) => {
    const id = req.params.id

    modelDetailHistory(id)
    .then((response) => {
      if(response.length > 0 ) {
        res.json(response)
      } else {
        res.json({
          message: "Oops, id not found"
        })
      }
    })
    .catch((error) => {
      console.log(error.message)
      res.status(500).send({
        message: error.message
      })
    })
  },

  // Update
  updateHistory: (req, res) => {
    const data = req.body
    const id = req.params.id

    modelUpdateHistory(data, id)
    .then((response) => {
      res.json({
        message: "Update data success"
      })
    })
    .catch((error) => {
      console.log(error.message)
      res.status(500).send({
        message: error.message
      })
    })
  },

  patchHistory: (req, res) => {
    const data = req.body
    const id = req.params.id

    modelPatchHistory(data, id)
    .then((response) => {
      res.json({
        message: "Update patch data success"
      })
    })
    .catch((error) => {
      console.log(error.message)
      res.status(500).send({
        message: error.message
      })
    })
  },

  // Delete
  deleteHistory: (req, res) => {
    const id = req.params.id
    modelDeleteHistory(id)
    .then((response) => {
      res.json({
        message: "Delete data success"
      })
    })
    .catch((error) => {
      console.log(error.message)
      res.status(500).send({
        message: error.message
      })
    })
  }

}