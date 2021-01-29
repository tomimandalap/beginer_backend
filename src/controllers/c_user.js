const bcrypt = require('bcrypt')

const {
  checkEmailUser,
  modelRegister,
  modelTotalUser,
  modelAllUser,
  modelDetailUser,
  modelUpdateUser,
  modelDeleteUser
} = require('../models/m_user')

// response
const {success, failed, notfound} = require('../helpers/response')
// jwt
const jwt = require('jsonwebtoken')
// env
const {envJWTSECRET} = require('../helpers/nv')

module.exports = {
  // LOGIN
  login: (req, res) => {
    const body = req.body
    // console.log(body)
    checkEmailUser(body.email)
    .then(async(response) => {
      if (response.length === 1) {
        // console.log(response[0].pass)
        const checkPass = await bcrypt.compare(body.pass, response[0].pass)
        if (checkPass) {
          const dataUser = {
            email: response[0].email,
            id: response[0].id,
            access: response[0].access
          } 
          // token
          const token = jwt.sign(dataUser, envJWTSECRET)
          res.json({
            message: "Login Success",
            token
          })
        } else {
          res.json({
            message: "Login failed, password wrong!"
          })
        }
      } else {
        res.json({
          message: "Email not found!"
        })
      }
    })
    .catch((error) => {
      console.log(error.message)
    })
  },
  // REGISTER
  register: async(req, res) => {
    const body = req.body
    
    checkEmailUser(body.email)
    .then(async(response) => {
      if (response.length >= 1) {
        res.json({
          message: "Email registered!"
        })
      } else {
        // console.log(response)
        const salt = await bcrypt.genSalt(10)
        const pass = await bcrypt.hash(body.pass, salt)
        const user = {
          name: body.name,
          email: body.email,
          pass,
          access: body.access
        }

        modelRegister(user)
        .then((response) => {
          // res.json(response)
          success(res, 'Create data user success', {}, response)
        })
        .catch((error) => {
          // res.json(error)
          failed(res, 'Internal server error!', [])
        })
      }
    })
    .catch((error) => {
      console.log(error.message)
    })
  },
  // Read All data 
  readAllUser: async(req, res) => {
    try {
      // searching name user
      const name = req.query.name
      const search = name ? `WHERE name LIKE '%${name}%'` : ``

      // sortby and metode ASC or DESC
      const order = req.query.order ? req.query.order : ``
      const metode = req.query.metode ? req.query.metode : `asc`
      const sortby = order ? `ORDER BY ${order} ${metode}` : ``

      // pagination
      const page = req.query.page ? req.query.page : 1
      const limit = req.query.limit ? req.query.limit : 4
      const start = page===1 ? 0 : (page-1)*limit
      const pages = page ? `LIMIT ${start}, ${limit}` : ``

      // total page tb user
      const totalPage = await modelTotalUser(search)

      modelAllUser(search, sortby, pages)
      .then((response) => {
        if(response.length > 0) {
          const pagination = {
            page: page,
            limit: limit,
            total: totalPage[0].total,
            totalPage: Math.ceil(totalPage[0].total/limit)
          }
          success(res, 'Get all data user', pagination, response)
        } else {
          notfound(res, 'Oops, data not found!', [])
        }
      })
      .catch((error) => {
        console.log(error.message)
        failed(res, 'Internal server error!', [])
      })
    } catch (error) {
      console.log(error.message)
      failed(res, 'Internal server error!', error.message)
    }
  },
  // detail
  detailUser: (req, res) => {
    const id = req.params.id
    modelDetailUser(id)
    .then((response) => {
      if(response.length>0) {
        success(res, 'Get detail user id : ' + id, {}, response)
      } else {
        notfound(res, 'Opps, user id : ' + id + ' not found!', [])
      }
    })
    .catch((error) => {
      console.log(error.message)
      failed(res, 'Internal server error!', [])
    })
  }, 
  // Edit data
  updatePutUser: (req, res) => {
    const data = req.body
    const id = req.params.id

    modelUpdateUser(data, id)
    .then((response) => {
      success(res, 'Update data user id : ' + id, {}, response)
    })
    .catch((error) => {
      console.log(error.message)
      failed(res, 'Internal server error!', [])
    })
  },
  // delete data
  deleteUser: (req, res) => {
    const id = req.params.id
    modelDeleteUser(id)
    .then((response) => {
      success(res, 'Delete data user id : ' + id + ' success', {}, [])
    })
    .catch((error) => {
      console.log(error.message)
      failed(res, 'Internal server error!', error.message)
    })
  }
}