const {
  modelCreatCategory,
  modelReadCategory,
  modelReadTotalCategory,
  modelDetailCategory,
  modelUpdateCategory,
  modelPatchCategory,
  modelDeleteCategory,
  modelReadCategoryRedis
} = require('../models/m_category')

// response
const {success, created, badreques, notfound, failed} = require('../helpers/response')

// redis
const redisClient = require('../config/redis/redis')

module.exports = {
  // set redis
  setDataRedis: () => {
    modelReadCategoryRedis().then((response) => {
      const data =JSON.stringify(response)
      redisClient.set('datacategory', data)
    }).catch((error) => {
      console.log('error')
    })
  },

  // Create POST data
  creatCategory: (req, res) => {
    const data = req.body
    if(!data.category || !data.description) {
      badreques(res, 'Bad request', [])
    } else {
      modelCreatCategory(data)
      .then((response)=> {
        module.exports.setDataRedis()
        created(res, 'Create data category success', data)
      })
      .catch((error) => {
        console.log(error.message)
        failed(res, 'Internal server error!', [])
      })
    }
  },

  // Read all value tb_category
  readAllCategory: async(req, res) => {
    try {
      // searching by category
      const search = req.query.search ? req.query.search : 'category'
      const keyword = req.query.keyword ? req.query.keyword : ``
      const searching = search ? `WHERE ${search.toString().toLowerCase()} LIKE '%${keyword.toString().toLowerCase()}%'` : ``

      // sort by category methode asc or desc
      const sort = req.query.sort ? req.query.sort : ``
      const metode = req.query.metode ? req.query.metode : 'asc'
      const sorted = sort ? `ORDER BY ${sort} ${metode.toString().toLowerCase()}` : ``

      // pagination table category
      const page = req.query.page ? req.query.page : 1
      const limit = req.query.limit ? req.query.limit : 4
      const start = page === 1 ? 0 : (page-1)*limit
      const pages = page ? `LIMIT ${start}, ${limit}` : ``

      // count total row data 
      const totalPage = await modelReadTotalCategory(searching)
    
      modelReadCategory(searching, sorted, pages)
      .then((response) => {
        if (response.length > 0) {
          const dataArr = []
          response.forEach((el) => {
            dataArr.push({
              category: el.category,
              description: el.description
            })
          })
          const pagination = {
            page: page,
            limit: limit,
            total: totalPage[0].total,
            totalPage: Math.ceil(totalPage[0].total/limit)
          }
          module.exports.setDataRedis()
          success(res, 'get all data category from database', pagination, dataArr)
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

  // Read detail value category using "category"
  detailCategory: (req, res) => {
    const category = req.params.category
    modelDetailCategory(category)
    .then((response) => {
      if (response.length > 0) {
        success(res, 'Get detail data category: '+category+' success', {}, response)
      } else {
        notfound(res, "Oops, data not found!", [])
      }
    })
    .catch((error) => {
      console.log(error.message)
      failed(res, 'Internal server error!', [])
    })
  },

  // Update category
  updateCategory: (req, res) => {
    const category = req.params.category
    const data = req.body

    modelUpdateCategory(data, category)
    .then((response) => {
      module.exports.setDataRedis()
      success(res, 'Update data category success', {}, data)
    })
    .catch((error) => {
      console.log(error.message)
      failed(res, 'Internal server error!', [])
    })
  },

  // Patch update category
  patchCategory: (req, res) => {
    const category = req.params.category
    const data = req.body

    modelPatchCategory(data, category)
    .then((response)=>{
      module.exports.setDataRedis()
      success(res, 'Update patch data category success', {}, data)
    })
    .catch((error) => {
      console.log(error.message)
      failed(res, 'Internal server error!', [])
    })
  },

  deleteCategory: (req, res) => {
    const category = req.params.category
    modelDeleteCategory(category)
    .then((response) => {
      module.exports.setDataRedis()
      success(res, 'Delete data category: '+category+' success', {}, [])
    })
    .catch((error) => {
      console.log(error.message)
      failed(res, 'Internal server error!', [])
    })
  }
}