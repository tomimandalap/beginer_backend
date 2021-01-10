const {
  modelCreateCart,
  modelReadCart,
  modelDetailCart,
  modelUpdatecart,
  modelPatchCart,
  modelDeleteCart
} = require('../models/m_cart')

module.exports = {

  // Creat data to tb_cart
  createCart: (req, res) => {
    const data = req.body

    for(let i=0; i<data.length; i++) {
      readData(data[i])
    }

    function readData(element) {

      const subtotal = element.incart * element.price
      
      modelCreateCart(element, subtotal)
      .then((response) => {
        res.json({
          message: "Create data cart success"
        })
      })
      .catch((error) => {
        console.log(error.message)
        res.status(500).send({
          message: error.message || "Some error occurred while creating the post"
        })
      })
    }

  },

  // READ
  readCart: (req, res) => {
    modelReadCart()
    .then((response) => {
      res.json(response)
    })
    .catch((error) => {
      console.log(error.message)
      res.status(500).send({
        message: error.message || "Some error occurred while creating the get"
      })
    })
  },

  detailCart: (req, res) => {
    const id = req.params.id
    modelDetailCart(id)
    .then((response) => {
      res.json(response)
    })
    .catch((error) => {
      console.log(error.message)
      res.status(500).send({
        message: error.message || "Some error occurred while creating the get"
      })
    })
  },

  // UPDATE
  updateCart: (req, res) => {
    const id = req.params.id
    const data = req.body
    modelUpdatecart(data, id)
    .then((response) => {
      res.json({
        message: "Update data success"
      })
    })
    .catch((error) => {
      console.log(error.message)
      res.status(500).send({
        message: error.message || "Some error occurred while creating the put"
      })
    })
  },

  patchCart: (req, res) => {
    const id = req.params.id
    const data = req.body
    modelPatchCart(data, id)
    .then((response) => {
      res.json({
        message: "Patch update data success"
      })
    })
    .catch((error) => {
      console.log(error.message)
      res.status(500).send({
        message: error.message || "Some error occurred while creating the patch"
      })
    })
  },

  // DELETE
  deleteCart: (req, res) => {
    const id = req.query.id
    const row = id ? `WHERE id='${id}'` : ``

    const code = req.query.code
    const receipt = code ? `WHERE receipt='${code}'` : ``

    modelDeleteCart(row, receipt)
    .then((response) => {
      res.json({
        message: "Delete data success"
      })
    })
    .catch((error) => {
      console.log(error.message)
      res.status(500).send({
        message: error.message || "Some error occurred while creating delete"
      })
    })
  }


}