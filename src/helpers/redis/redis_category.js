const client = require('../../config/redis/redis')
const _ = require('lodash')
const {success, notfound} = require('../response')

module.exports = {
  // get all category 
  getAllCategory: (req, res, next) => {
    client.get('datacategory', (error, result) => {
      if(!error) {
        // console.log('REDISS')
        if (result) {
          const data = JSON.parse(result)
          // search
          const search = req.query.search ? req.query.search : `category`
          const keyword = req.query.keyword ? req.query.keyword : ``
          // sort by category methode asc or desc
          const sort = req.query.sort ? req.query.sort : ``
          const metode = req.query.metode ? req.query.metode : 'asc'
          // pagination table category
          const page = req.query.page ? req.query.page : 1
          const limit = req.query.limit ? req.query.limit : 3
          const start = page === 1 ? 0 : (page-1)*limit
          // filtering data
          const filtering = _.filter(data, (item) => {
            return item[search].toString().toLowerCase().includes(keyword.toString().toLowerCase())
          })
          // logic cek data
          if (filtering.length>0) {
            // sorting data
            const sorting = _.orderBy(filtering, sort, metode.toString().toLowerCase())
            const paginationData = _.slice(sorting, start,start + Number(limit))
            const pagination = {
              page: page,
              limit: limit,
              totalData: filtering.length,
              totalPage: Math.ceil(filtering.length/limit)
            }
            success(res,'Get all data category from redis success', pagination, paginationData)
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