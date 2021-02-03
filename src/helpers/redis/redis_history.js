const client = require('../../config/redis/redis')
const _ = require('lodash')
const {success, notfound} = require('../response')

module.exports = {
  getAllHistory: (req, res, next) => {
    client.get('datahistory', (error, result) => {
      if(!error) {
        if (result) {
          const data = JSON.parse(result)
          // search
          const search = req.query.search ? req.query.search : `invoices`
          const keyword = req.query.keyword ? req.query.keyword : ``
          // order && metode (ASC, DESC)
          const sort = req.query.sort ? req.query.sort : ``
          const metode = req.query.metode ? req.query.metode : 'asc'
          // pagination
          const page = req.query.page ? req.query.page : 1
          const limit = req.query.limit ? req.query.limit : 5
          const start = page===1 ? 0 : (page-1)*limit
          // filtering data
          const filtering = _.filter(data, (item) => {
            return item[search].toString().toLowerCase().includes(keyword.toString().toLowerCase())
          })
          // check data
          if (filtering.length > 0) {
            // sorting data
            const sorting = _.orderBy(filtering, sort, metode.toString().toLowerCase())
            const paginationData = _.slice(sorting, start,start + Number(limit))
            const pagination = {
              page: page,
              limit: limit,
              totalData: filtering.length,
              totalPage: Math.ceil(filtering.length/limit)
            }
            success(res,'Get all data history from redis success', pagination, paginationData)
          } else {
            notfound(res,'Oops, data not found!', [])
          }
        } else {
          next()
        }
      } else {
        console.log(error.message)
      }
    })
  }
}