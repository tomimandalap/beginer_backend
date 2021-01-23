const { 
  modelCreatProduct,
  modelReadProduct,
  modelReadTotalProduct,
  modelDetailProdcut,
  modelUpdateProduct,
  modelPatchProduct,
  modelDeleteProduct
} = require('../models/m_product')

const { 
  success, 
  created, 
  badreques, 
  notfound, 
  failed
} = require('../helpers/response')

module.exports = {
  
  // Create POST data
  creatProduct: (req, res) => {
    const data = req.body
    if (data.category == '' || data.name == '' || data.image == '' || data.price == ''){
      badreques(res, 'Bad request', [])
    } else {
      modelCreatProduct(data)
      .then((response) => {
        created(res, 'Create data product success', data)
      })
      .catch((error) => {
        console.log(error.message)
        failed(res, 'Internal server error!', [])
      })
    }
  },

  // Read GET data
  readAllProduct: async(req, res) => {
    try {
      // searcing name
      const name = req.query.name 
      const search = name ? `WHERE name LIKE '%${name}%'` : ``

      // order && metode (ASC, DESC)
      const order = req.query.order ? req.query.order : ``
      const metode = req.query.metode ? req.query.metode : 'asc'
      const data = order ? `ORDER BY ${order} ${metode}` : ``

      // pagination
      const page = req.query.page ? req.query.page : 1
      const limit = req.query.limit ? req.query.limit : 4
      const start = page===1 ? 0 : (page-1)*limit
      const pages = page ? `LIMIT ${start}, ${limit}` : ``

      // category product
      const code = req.query.code
      const category = code ? `LEFT JOIN tb_category ON tb_product.category = tb_category.category WHERE tb_product.category = '${code}'` : ``
      
      // total page
      const totalPage = await modelReadTotalProduct(search)

      modelReadProduct(search, data, pages, category)
      .then((response) => {
        if ( response.length > 0) {

          const dataArr = []
          response.forEach((el) => {
            dataArr.push({
              id: el.id,
              date: el.date,
              category: el.category,
              name: el.name,
              image: el.image,
              price: el.price
            })
          })

          const pagination = {
            page: page,
            limit: limit,
            total: totalPage[0].total,
            totalPage: Math.ceil(totalPage[0].total/limit)
          }

          success(res, 'Get all product success', pagination, dataArr)
          // res.json(dataArr)
        } else {
          notfound(res, "Oops, data not found!", [])
        }
      })
      .catch((error) => {
        console.log(error.message)
        failed(res, 'Internal server error!', error.message)
      })
    } catch (error) {
      console.log(error.message)
      failed(res, 'Internal server error!', [])
    }
  },

  // READ Detail product using "id"
  detailProduct: (req, res) => {
    const id = req.params.id
    modelDetailProdcut(id)
    .then((response)=>{
      if (response.length > 0) {
        // res.json(response)
        success(res, 'Get detail product id: '+id+' success', {}, response)
      } else {
        notfound(res, "Oops, id not found!", [])
      }
    })
    .catch((error) => {
      console.log(error.message)
      failed(res, 'Internal server error!', error.message)
    })
  },

  // UPDATE
  updateProduct: (req, res) => {
    const id = req.params.id
    const data = req.body
    modelUpdateProduct(data, id)
    .then((response)=>{
      success(res, 'Update data product success', {}, data)
    })
    .catch((error) => {
      console.log(error.message)
      failed(res, 'Internal server error!', error.message)
    })
  },

  patchProduct: (req, res) => {
    const id = req.params.id
    const data = req.body
    modelPatchProduct(data, id)
    .then((response)=>{
      success(res, 'Update patch data product success', {}, data)
    })
    .catch((error) => {
      console.log(error.message)
      failed(res, 'Internal server error!', error.message)
    })
  },

  // Delete
  deleteProduct: (req, res) => {
    const id = req.params.id
    modelDeleteProduct(id)
    .then((response) => {
      success(res, 'Delete product success id: '+id+' success', {}, [])
    })
    .catch((error) => {
      console.log(error.message)
      failed(res, 'Internal server error!', error.message)
    })
  }
}