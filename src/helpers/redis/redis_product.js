const client = require('../../config/redis/redis')
const _ = require('lodash')
const {success, notfound} = require('../response')

module.exports = {
  // get all product
  getAllProduct: (req, res, next) => {
    client.get('dataproduct', (error, result) => {
      if(!error) {
        if (result) {
          const data = JSON.parse(result)
          // search
          const search = req.query.search ? req.query.search : 'name'
          const keyword = req.query.keyword ? req.query.keyword : ''
          // order && metode (ASC, DESC)
          const sort = req.query.sort ? req.query.sort : ''
          const metode = req.query.metode ? req.query.metode : 'asc'
          // pagination
          const limit = req.query.limit ? req.query.limit : 2
          const page = req.query.page ? req.query.page : 1
          const start = page===1 ? 0 : (page-1)*limit
          // filter data
          const filtering = _.filter(data, (item) => {
            return item[search].toString().toLowerCase().includes(keyword.toLowerCase())
          })
          // logic cek data
          if (filtering.length >= 1) {
            // sorting data
            const sorting = _.orderBy(filtering, sort, metode.toString().toLowerCase())
            const paginationData = _.slice(sorting, start,start + Number(limit))
            const pagination = {
              page: page,
              limit: limit,
              totalData: filtering.length,
              totalPage: Math.ceil(filtering.length / limit)
            }
            success(res,'Get all data product from redis success', pagination, paginationData)
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