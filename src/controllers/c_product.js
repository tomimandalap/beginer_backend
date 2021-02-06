const { 
  modelCreatProduct,
  modelReadProduct,
  modelReadTotalProduct,
  modelDetailProdcut,
  modelUpdateProduct,
  modelPatchProduct,
  modelDeleteProduct,
  modelReadProductRedis
} = require('../models/m_product')

const { 
  success, 
  created, 
  badreques, 
  notfound, 
  failed
} = require('../helpers/response')

// redis
const redisClient = require('../config/redis/redis')

// filesystem
const fs = require('fs')

module.exports = {
  // set redis
  setDataRedis: () => {
    modelReadProductRedis().then((response) => {
      const data =JSON.stringify(response)
      redisClient.set('dataproduct', data)
    }).catch((error) => {
      console.log(error)
    })
  },
  // Create POST data
  creatProduct: (req, res) => {
    const data = req.body 
    // res.json({
    //   status: true,
    //   multer: req.file.filename
    // })
    if (data.category == '' || data.name == '' || data.price == ''){
      // console.log(req.file.filename)
      const locationPath = `./public/img/${req.file.filename}`
      fs.unlinkSync(locationPath)
      badreques(res, 'Bad request', [])
    } else {
      const newData = {
        category: data.category,
        name: data.name,
        image: req.file.filename,
        price: data.price
      }
      
      modelCreatProduct(newData)
      .then((response) => {
        module.exports.setDataRedis()
        created(res, 'Create data product success', response)
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
      const search = req.query.search ? req.query.search : 'name' 
      const keyword = req.query.keyword ? req.query.keyword : ``
      const searching = search ? `WHERE ${search.toString().toLowerCase()} LIKE '%${keyword.toString().toLowerCase()}%'` : ``

      // order && metode (ASC, DESC)
      const sort = req.query.sort ? req.query.sort : ``
      const metode = req.query.metode ? req.query.metode : 'asc'
      const sorting = sort ? `ORDER BY ${sort} ${metode.toString().toLowerCase()}` : ``

      // pagination
      const page = req.query.page ? req.query.page : 1
      const limit = req.query.limit ? req.query.limit : 4
      const start = page===1 ? 0 : (page-1)*limit
      const pages = page ? `LIMIT ${start}, ${limit}` : ``

      // category product
      const code = req.query.code
      const category = code ? `LEFT JOIN tb_category ON tb_product.category = tb_category.category WHERE tb_product.category = '${code}'` : ``
      
      // total page
      const totalPage = await modelReadTotalProduct(searching)

      modelReadProduct(searching, sorting, pages, category)
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
          module.exports.setDataRedis()
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
  updateProduct: async(req, res) => {
    try {
      const id = req.params.id
      const callDetail = await modelDetailProdcut(id)
      const data = req.body

      const newData = {
        category: data.category,
        name: data.name,
        image: req.file.filename,
        price: data.price
      }
      // falidation data
      if (!newData.category || !newData.name || !newData.image || !newData.price) {
        const locationPath = `./public/img/${req.file.filename}`
        fs.unlinkSync(locationPath)
        badreques(res, 'Bad request', [])
      } else {
        modelUpdateProduct(newData, id)
        .then((response)=>{
          const locationPath = `./public/img/${callDetail[0].image}`
          fs.unlinkSync(locationPath)
          module.exports.setDataRedis()
          success(res, 'Update data product success', {}, newData)
        })
        .catch((error) => {
          console.log(error.message)
          failed(res, 'Internal server error!', error.message)
        })
      }
    } catch (error) {
      failed(res, 'Internal server error!', error.message)
    }
  },

  patchProduct: (req, res) => {
    const id = req.params.id
    const data = req.body
    modelPatchProduct(data, id)
    .then((response)=>{
      module.exports.setDataRedis()
      success(res, 'Update patch data product success', {}, data)
    })
    .catch((error) => {
      console.log(error.message)
      failed(res, 'Internal server error!', error.message)
    })
  },

  // Delete
  deleteProduct: async(req, res) => {
    try {
      const id = req.params.id
      const callDetail = await modelDetailProdcut(id)

      modelDeleteProduct(id)
      .then((response) => {
        if (response.affectedRows) {
          const locationPath = `./public/img/${callDetail[0].image}`
          // console.log(locationPath)
          fs.unlinkSync(locationPath)
          module.exports.setDataRedis()
          success(res, 'Delete product from id: '+id+' success', {}, [])
        } else {
          notfound(res,'Oops, id : ' + id + ' unavailable!', [])
        }
      })
      .catch((error) => {
        console.log(error.message)
        failed(res, 'Internal server error!', error.message)
      })
    } catch (error) {
      failed(res, 'Internal server error!', error.message)
    }
  }
}