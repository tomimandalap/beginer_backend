const bcrypt = require('bcrypt')

const {
  checkEmailUser,
  modelRegister
} = require('../models/m_user')

const {success, failed} = require('../helpers/response')

const jwt = require('jsonwebtoken')

const {envJWTSECRET} = require('../helpers/nv')

module.exports = {
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
  }
}