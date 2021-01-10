const { 
  modelCreatProduct,
  modelReadProduct,
  modelDetailProdcut,
  modelUpdateProduct,
  modelPatchProduct,
  modelDeleteProduct
} = require('../models/m_product')

module.exports = {
  
  // Create POST data
  creatProduct: (req, res) => {
    const data = req.body

    modelCreatProduct(data)
    .then((response) => {
      res.json({
        message: "Create data success"
      })
    })
    .catch((error) => {
      console.log(error.message)
      res.status(500).send({
        message: error.message
      })
    })
  },

  // Read GET data
  readAllProduct: (req, res) => {
    // searcing name
    const name = req.query.name 
    const search = name ? `WHERE name LIKE '%${name}%'` : ``

    // order && metode (ASC, DESC)
    const order = req.query.order
    const metode = req.query.metode
    const data = order ? `ORDER BY ${order} ${metode}` : ``

    // pagination
    const page = req.query.page
    const limit = req.query.limit
    const start = page===1 ? 0 : (page-1)*limit
    const pages = page ? `LIMIT ${start}, ${limit}` : ``

    // category product
    const id = req.query.id
    const category = id ? `LEFT JOIN tb_category ON tb_product.code = tb_category.code WHERE tb_product.code = '${id}'` : ``

    modelReadProduct(search, data, pages, category)
    .then((response) => {
      if ( response.length > 0) {
        res.json(response)
      } else {
        res.json({
          message: "Oops, data not found"
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

  // READ Detail product using "id"
  detailProduct: (req, res) => {
    const id = req.params.id
    modelDetailProdcut(id)
    .then((response)=>{
      if (response.length > 0) {
        res.json(response)
      } else {
        res.json({
          message: "Oops, id not found!"
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

  // UPDATE
  updateProduct: (req, res) => {
    const id = req.params.id
    const data = req.body
    modelUpdateProduct(data, id)
    .then((response)=>{
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

  patchProduct: (req, res) => {
    const id = req.params.id
    const data = req.body
    modelPatchProduct(data, id)
    .then((response)=>{
      res.json({
        message: "Patch update data success"
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
  deleteProduct: (req, res) => {
    const id = req.params.id
    modelDeleteProduct(id)
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