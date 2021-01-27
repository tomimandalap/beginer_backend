const client = require('../../config/redis/redis')
const _ = require('lodash')
const {success} = require('../response')

module.exports = {
  // get all product
  getAllProduct: (req, res, next) => {
    client.get('dataproduct', (error, result) => {
      if(!error) {
        // console.log('REDISS')
        if (result) {
          const data = JSON.parse(result)

          const name = req.query.name ? req.query.name : ``

          // order && metode (ASC, DESC)
          const order = req.query.order ? req.query.order : ``
          const metode = req.query.metode ? req.query.metode : 'asc'

          // pagination
          const page = req.query.page ? req.query.page : 1
          const limit = req.query.limit ? req.query.limit : 4
          const start = page===1 ? 0 : (page-1)*limit

          // console.log(data)
          // res.json(data)

          if(name.length>0) {
            // search
            const filtered = _.filter(data, (item) => {
              return item.name.includes(name)
            })

            const paginationData = _.slice(filtered, start, start+limit)
            const pagination = {
              page: page,
              limit: limit,
              total: data.length,
              totalPage: Math.ceil(data.length/limit)
            }
            success(res,'Get all search product from redis success', pagination, paginationData)
          } else if(order.length>0) {
            // sort by
            // const sorted = _.sortBy(data, order)
            const sorted = _.orderBy(data, order, metode)

            const paginationData = _.slice(sorted, start, start+limit)

            const pagination = {
              page: page,
              limit: limit,
              total: data.length,
              totalPage: Math.ceil(data.length/limit)
            }
            success(res,'Get all sortby product from redis success', pagination, paginationData)
          } else {
            const paginationData = _.slice(data, start, start+limit)
            const pagination = {
              page: page,
              limit: limit,
              total: data.length,
              totalPage: Math.ceil(data.length/limit)
            }
            success(res,'Get all product from redis success', pagination, paginationData)
          }
        } else {
          next()
        }
      } else {
        console.log(error.message)
      }
    })
  },
  // get all category 
  getAllCategory: (req, res, next) => {
    client.get('datacategory', (error, result) => {
      if(!error) {
        // console.log('REDISS')
        if (result) {
          const data = JSON.parse(result)

          // search
          const search = req.query.search
          // const search = category ? `WHERE category LIKE '%${category}%'` : ``

          // sort by category methode asc or desc
          const order = req.query.order ? req.query.order : ``
          const metode = req.query.metode ? req.query.metode : 'asc'
          // const sorted = order ? `ORDER BY ${order} ${metode}` : ``

          // pagination table category
          const page = req.query.page ? req.query.page : 1
          const limit = req.query.limit ? req.query.limit : 3
          const start = page === 1 ? 0 : (page-1)*limit
          // const pages = page ? `LIMIT ${start}, ${limit}` : ``

          // console.log(data)
          // res.json(data)

          if(search) {
            // search
            const filtered = _.filter(data, (item) => {
              return item.category.includes(search)
            })

            const paginationData = _.slice(filtered, start, start+limit)
            const pagination = {
              page: page,
              limit: limit,
              total: data.length,
              totalPage: Math.ceil(data.length/limit)
            }
            success(res,'Get all search category from redis success', pagination, paginationData)
          } else if (order.length>0) {
            // sort by
            // const sorted = _.sortBy(data, order)
            const sorted = _.orderBy(data, order, metode)

            const paginationData = _.slice(sorted, start, start+limit)

            const pagination = {
              page: page,
              limit: limit,
              total: data.length,
              totalPage: Math.ceil(data.length/limit)
            }
            success(res,'Get all sortby category from redis success', pagination, paginationData)
          } else {
            // show all data
            const paginationData = _.slice(data, start, start+limit)
            const pagination = {
              page: page,
              limit: limit,
              total: data.length,
              totalPage: Math.ceil(data.length/limit)
            }
            success(res,'Get all category from redis success', pagination, paginationData)
          }
        } else {
          next()
        }
      } else {
        console.log(error.message)
      }
    })
  },
  // get all product
  getAllHistory: (req, res, next) => {
    client.get('datahistory', (error, result) => {
      if(!error) {
        // console.log('REDISS')
        if (result) {
          const data = JSON.parse(result)

          // search
          const search = req.query.search

          // order && metode (ASC, DESC)
          const order = req.query.order
          const metode = req.query.metode ? req.query.metode : 'asc'

          // pagination
          const page = req.query.page ? req.query.page : 1
          const limit = req.query.limit ? req.query.limit : 5
          const start = page===1 ? 0 : (page-1)*limit

          // console.log(search)
          // res.json(data)

          if(search) {
            // search
          const filtered = _.filter(data, (item) => {
            return item.invoices.includes(search)
          })

          const paginationData = _.slice(filtered, start, start+limit)
          const pagination = {
            page: page,
            limit: limit,
            total: data.length,
            totalPage: Math.ceil(data.length/limit)
          }
          success(res,'Get all search history from redis success', pagination, paginationData)
          } else if(order) {
            // sort by
            // const sorted = _.sortBy(data, order)
            const sorted = _.orderBy(data, order, metode)

            const paginationData = _.slice(sorted, start, start+limit)

            const pagination = {
              page: page,
              limit: limit,
              total: data.length,
              totalPage: Math.ceil(data.length/limit)
            }
            success(res,'Get all sortby product from redis success', pagination, paginationData)
          } else {
            const paginationData = _.slice(data, start, start+limit)
            const pagination = {
              page: page,
              limit: limit,
              total: data.length,
              totalPage: Math.ceil(data.length/limit)
            }
            success(res,'Get all history from redis success', pagination, paginationData)
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