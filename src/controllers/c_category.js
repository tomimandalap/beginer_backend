const {
  modelCreatCategory,
  modelReadCategory,
  modelDetailCategory,
  modelUpdateCategory,
  modelPatchCategory,
  modelDeleteCategory
} = require('../models/m_category')

module.exports = {

  // Create POST data
  creatCategory: (req, res) => {
    const data = req.body
    modelCreatCategory(data)
    .then((response)=> {
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

  // Read all value tb_category
  readAllCategory: (req, res) => {
    modelReadCategory()
    .then((response) => {
      res.json(response)
    })
    .catch((error) => {
      console.log(error.message)
      res.status(500).send({
        message: error.message
      })
    })
  },

  // Read detail value category using "id"
  detailCategory: (req, res) => {
    const code = req.params.code
    modelDetailCategory(code)
    .then((response) => {
      if (response.length > 0) {
        res.json(response)
      } else {
        res.json({
          message: "Oops, parameter code not found!"
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

  // Update category
  updateCategory: (req, res) => {
    const code = req.params.code
    const data = req.body

    modelUpdateCategory(data, code)
    .then((response) => {
      res.json({
        message: "Update data category success"
      })
    })
    .catch((error) => {
      console.log(error.message)
      res.status(500).send({
        message: error.message
      })
    })
  },

  // Patch update category
  patchCategory: (req, res) => {
    const code = req.params.code
    const data = req.body

    modelPatchCategory(data, code)
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

  deleteCategory: (req, res) => {
    const code = req.params.code

    modelDeleteCategory(code)
    .then((response) => {
      res.json({
        message: "Delete data category success"
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