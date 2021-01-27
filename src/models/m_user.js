const conn = require('../config/dbconfig')

module.exports = {
  modelLogin: () => {
    return
  },
  checkEmailUser: (dataEmail) => {
    return new Promise((resolve, reject) => {
      conn.query(`SELECT * FROM tb_user WHERE email='${dataEmail}'`
      ,(error, result) => {
        if(!error) {
          resolve(result)
        } else {
          reject(new Error(error))
        }
      })
    })
  },
  modelRegister: (dataUser) => {
    return new Promise((resolve, reject) => {
      conn.query(`INSERT INTO tb_user SET ?`, dataUser, (error, result) => {
        if(!error) {
          resolve(result)
        } else {
          reject(new Error(error))
        }
      })
    })
  }
}