const {
  modelCreatCategory,
  modelReadCategory,
  modelReadTotalCategory,
  modelDetailCategory,
  modelUpdateCategory,
  modelPatchCategory,
  modelDeleteCategory
} = require('../models/m_category')

const {success, created, notfound, failed} = require('../helpers/response')

module.exports = {

  // Create POST data
  creatCategory: (req, res) => {
    const data = req.body
    modelCreatCategory(data)
    .then((response)=> {
      created(res, 'Create data category success', data)
    })
    .catch((error) => {
      console.log(error.message)
      failed(res, 'Internal server error!', [])
    })
  },

  // Read all value tb_category
  readAllCategory: async(req, res) => {
    try {
      // searching by category
    const category = req.query.category
    const search = category ? `WHERE category LIKE '%${category}%'` : ``

    // sort by category methode asc or desc
    const order = req.query.order ? req.query.order : ``
    const metode = req.query.metode ? req.query.metode : 'asc'
    const sorted = order ? `ORDER BY ${order} ${metode}` : ``

    // pagination table category
    const page = req.query.page ? req.query.page : 1
    const limit = req.query.limit ? req.query.limit : 10
    const start = page === 1 ? 0 : (page-1)*limit
    const pages = page ? `LIMIT ${start}, ${limit}` : ``

    // count total row data 
    const totalPage = await modelReadTotalCategory(search)
    
    modelReadCategory(search, sorted, pages)
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
        success(res, 'get all data category', pagination, dataArr)
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

  // Read detail value category using "id"
  detailCategory: (req, res) => {
    const category = req.params.category
    modelDetailCategory(category)
    .then((response) => {
      if (response.length > 0) {
        success(res, 'Get detail data category id: '+id+' success', {}, response)
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
      success(res, 'Delete data category id: '+id+' success', {}, [])
    })
    .catch((error) => {
      console.log(error.message)
      failed(res, 'Internal server error!', [])
    })
  }
}