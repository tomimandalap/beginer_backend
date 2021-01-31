const {modelCreateHistory} = require('../models/m_history')

const {
  modelCreateCart, 
  modelReadCart, 
  modelReadTotalCart,
  modelDetailCart,
  modelUpdateCart,
  modelDeleteIdCart,
  modelDeleteInvoicesCart
} = require('../models/m_cart')

const {success, created, badreques, notfound, failed} = require('../helpers/response')

module.exports = {
  // create data to cart
  createCart: (req, res) => {
    // data body 
    const data = req.body 

    // new data
    const newDATA = []
    data.forEach((element) => {
      newDATA.push({
        invoices: element.invoices,
        cashier: element.cashier,
        item: element.item,
        qty: element.qty,
        price: element.price,
        subtotal: element.subtotal
      })
    })

    // console.log(newDATA)
    // check validasi data
    let checkdata = false

    for (let i=0; i < newDATA.length; i++) {
      // console.log(newDATA[i])
      if (!newDATA[i].invoices || !newDATA[i].cashier || !newDATA[i].item || !newDATA[i].qty || !newDATA[i].price || !newDATA[i].subtotal) {
        checkdata = false
        break
      } else {
        checkdata = true
      }
    }

    if (checkdata) {
      // console.log('data check status true')
      // message error
      let messageError = ''
      for (let j=0; j < newDATA.length; j++) {
        modelCreateCart(newDATA[j])
        .then((response)=> {
          messageError = ''
        })
        .catch((error) => {
          messageError = error
        })
      }

      if (messageError) {
        failed(res, messageError, [])
      } else {
        created(res, 'Create data cart success', [])
      }
    } else {
      // console.log('data check status false')
      badreques(res, 'Bad request!', [])
    }
  },

  // read all data
  readCart: async(req, res) => {
    try {
      // searcing name
      const search = req.query.search ? req.query.search : 'invoices' 
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

      // const find = req.query.find

      // total page
      const totalPage = await modelReadTotalCart(searching)
      
      modelReadCart(searching, sorting, pages)
      .then((response) => {
        if (response.length > 0) {
          const dataArr = []
          response.forEach((e) => {
            dataArr.push({
              id: e.id,
              date: e.date,
              invoices: e.invoices,
              cashier: e.cashier,
              item: e.item,
              qty: e.qty,
              price: e.price,
              subtotal: e.subtotal
            })
          })

          const pagination = {
            page: page,
            limit: limit,
            total: totalPage[0].total,
            totalPage: Math.ceil(totalPage[0].total/limit)
          }
          success(res, 'Get all data cart success', pagination, dataArr)
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

  detailCart: (req, res) => {
    const id = req.params.id
    modelDetailCart(id)
    .then((response)=>{
      if (response.length > 0) {
        // res.json(response)
        success(res, 'Get detail cart id: '+id+' success', {}, response)
      } else {
        notfound(res, "Oops, id not found!", [])
      }
    })
    .catch((error) => {
      console.log(error.message)
      failed(res, 'Internal server error!', error.message)
    })
  },

  // Update
  updateCart: (req, res) => {
    const id = req.params.id
    const data = req.body
    modelUpdateCart(data, id)
    .then((response)=>{
      success(res, 'Update data cart id: '+id+' success', {}, data)
    })
    .catch((error) => {
      console.log(error.message)
      failed(res, 'Internal server error!', error.message)
    })
  },

  // delete
  // deleteIdCart: (req, res) => {
  //   const id = req.params.id
  //   modelDeleteIdCart(id)
  //   .then((response) => {
  //     success(res, 'Delete cart success id: '+id+' success', {}, [])
  //   })
  //   .catch((error) => {
  //     console.log(error.message)
  //     failed(res, 'Internal server error!', error.message)
  //   })
  // },

  deleteInvoicesCart: (req, res) => {
    const invoices = req.params.invoices
    modelDeleteInvoicesCart(invoices)
    .then((response) => {
      success(res, 'Delete cart success invoices: '+invoices+' success', {}, [])
    })
    .catch((error) => {
      console.log(error.message)
      failed(res, 'Internal server error!', error.message)
    })
  }
}