const jwt = require('jsonwebtoken')
const {envJWTSECRET} = require('../nv')

module.exports = {
  authentication: (req, res, next) => {
    const headers = req.headers
    // console.log(headers)
    if(!headers.token){
      res.json({
        message: "token required" // token tidak ada
      })
    } else {
      // console.log(headers)
      // next()
      jwt.verify(headers.token, envJWTSECRET, (error, decoded) =>{
        if(!error) {
          // console.log(decoded)
          res.useraccess = decoded.access // response custom
          next()
        } else {
          // console.log("Token not valid")
          res.json({
            message: "Token not valid"
          })
        }
      })
    }
  },
  authorizationAdmin: (req, res, next) => {
    const access = res.useraccess
    // console.log(access)
    // next()
    if (access === 0) {
      next()
    } else {
      res.json({
        message: "Oops, access denied!, Only for admin!"
      })
    }
  },
  authorizationCashier: (req, res, next) => {
    // next()
    const access = res.useraccess
    // console.log(access)
    // next()
    if (access === 1) {
      next()
    } else {
      res.json({
        message: "Oops, access denied!, Only for cashier!"
      })
    }
  }
}