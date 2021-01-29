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
  },
  // total page
  modelTotalUser: (search) => {
    return new Promise((resolve, reject) => {
      conn.query(`SELECT COUNT (*) as total FROM tb_user ${search}`
      ,(error, result) => {
        if(!error) {
          resolve(result)
        } else {
          reject(new Error(error))
        }
      })
    })
  },
  // READ
  modelAllUser: (search, sortby, pages) => {
    return new Promise((resolve, reject) => {
      conn.query(`SELECT * FROM tb_user ${search} ${sortby} ${pages}`
      ,(error, result) => {
        if(!error) {
          resolve(result)
        } else {
          reject(new Error(error))
        }
      })
    })
  },
  modelDetailUser: (id) => {
    return new Promise((resolve, reject) => {
      conn.query(`SELECT * FROM tb_user WHERE id='${id}'`
      ,(error, result) => {
        if(!error) {
          resolve(result)
        } else {
          reject(new Error(error))
        }
      })
    })
  },
  // UPDATE
  modelUpdateUser: (data, id) => {
    return new Promise ((resolve, reject) => {
      conn.query(`UPDATE tb_user 
      SET name='${data.name}', email='${data.email}', pass='${data.pass}', access='${data.access}' 
      WHERE id='${id}'`
      , (error, result) => {
        if(!error) {
          resolve(result)
        } else {
          reject(new Error(error))
        }
      })
    })
  },
  // DELETE
  modelDeleteUser: (id) => {
    return new Promise ((resolve, reject) => {
      conn.query(`DELETE FROM tb_user WHERE id=${id}`
      , (error, result) => {
        if(!error) {
          resolve(result)
        } else {
          reject(new Error(error))
        }
      })
    })
  }
}