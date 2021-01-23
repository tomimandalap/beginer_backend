const {
  modelCreateHistory,
  modelReadHistory,
  modelReadTotalHistory,
  modelDetailHistory,
  modelUpdateHistory,
  modelPatchHistory,
  modelDeleteHistory
} = require('../models/m_history')

const {success, created, badreques, notfound, failed} = require('../helpers/response')

module.exports = {
  // Create
  createHistory: (req, res) => {
    const data = req.body

    if (data.invoices == '' || data.cashier == '' || data.cart == '' || data.amount == '') {
      badreques(res, 'Bad request', [])
    } else {
      modelCreateHistory(data)
      .then((response) => {
        success(res, 'Create data history success', {}, data)
      })
      .catch((error) => {
        console.log(error.message)
        failed(res, 'Internal server error!', [])
      })
    }
  },

  // Read
  readHistory: async(req,res) => {
    try {
      // search
      const invoices = req.query.invoices
      const search = invoices ? `WHERE invoices LIKE '%${invoices}%'` : ``

      // order && metode (ASC, DESC)
      const order = req.query.order
      const metode = req.query.metode ? req.query.metode : 'asc'
      const data = order ? `ORDER BY ${order} ${metode}` : ``

      // pagination
      const page = req.query.page ? req.query.page : 1
      const limit = req.query.limit ? req.query.limit : 20
      const start = page===1 ? 0 : (page-1)*limit
      const pages = page ? `LIMIT ${start}, ${limit}` : ``

      // total page history
      const totalPage = await modelReadTotalHistory(search)

      modelReadHistory(search, data, pages)
      .then((response) => {
        if(response.length > 0){

          const dataArr = []
          response.forEach((el) => {
            dataArr.push({
              id: el.id,
              invoices: el.invoices,
              cashier: el.cashier,
              date: el.date,
              cart: el.cart,
              amount: el.amount
            })
          })

          const pagination = {
            page: page,
            limit: limit,
            total: totalPage[0].total,
            totalPage: Math.ceil(totalPage[0].total/limit)
          }

          success(res, 'Get all history success', pagination, dataArr)
        } else {
          notfound(res,'Oops, data not found!', [])
        }
      })
      .catch((error) => {
        console.log(error.message)
        failed(res, 'Internal server error!', error.message)
      })
    } catch (error) {
      failed(res, 'Internal server error!',[])
    }
  },

  detailHistory: (req, res) => {
    const id = req.params.id
    modelDetailHistory(id)
    .then((response) => {
      if(response.length > 0 ) {
        success(res, 'Get detail data history id: '+id+' success', {}, response)
      } else {
        notfound(res, 'Oops, data not found!', [])
      }
    })
    .catch((error) => {
      console.log(error.message)
      failed(res, 'Internal server error!', [])
    })
  },

  // Update
  updateHistory: (req, res) => {
    const data = req.body
    const id = req.params.id

    modelUpdateHistory(data, id)
    .then((response) => {
      success(res, 'Update data history success', {}, data)
    })
    .catch((error) => {
      console.log(error.message)
      failed(res, 'Internal server error!', [])
    })
  },

  patchHistory: (req, res) => {
    const data = req.body
    const id = req.params.id

    // console.log(data)

    modelPatchHistory(data, id)
    .then((response) => {
      success(res, 'Update patch data history success', {}, data)
    })
    .catch((error) => {
      console.log(error.message)
      failed(res, 'Internal server error!', [])
    })
  },

  // Delete
  deleteHistory: (req, res) => {
    const id = req.params.id
    modelDeleteHistory(id)
    .then((response) => {
      success(res, 'Delete data history id: '+id+' success', {}, [])
    })
    .catch((error) => {
      console.log(error.message)
      failed(res, 'Internal server error!', [])
    })
  }

}