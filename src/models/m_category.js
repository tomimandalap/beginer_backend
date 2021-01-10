const conn = require('../config/dbconfig')

module.exports = {
  // Creat new field data category
  modelCreatCategory: (data) => {
    return new Promise ((resolve, reject) => {
      conn.query(`INSERT INTO tb_category 
      VALUES ('${data.code}','${data.category}','${data.description}')`
      , (error, result) => {
        if(!error) {
          resolve(result)
        } else {
          reject(new Error(error))
        }
      })
    })
  },

  // Read all field table product
  modelReadCategory: () => {
    return new Promise ((resolve, reject) => {
      conn.query(`SELECT * FROM tb_category`
      , (error, result) => {
        if(!error) {
          resolve(result)
        } else {
          reject(new Error(error))
        }
      })
    })
  },

  // Read detail category 
  modelDetailCategory: (code) => {
    return new Promise ((resolve, reject) => {
      conn.query(`SELECT * FROM tb_category WHERE code='${code}'`
      , (error, result) => {
        if(!error) {
          resolve(result)
        } else {
          reject(new Error(error))
        }
      })
    })
  },

  // Update data category
  modelUpdateCategory: (data, code) => {
    return new Promise ((resolve, reject) => {
      conn.query(`UPDATE tb_category SET category='${data.category}', description='${data.description}' 
      WHERE code='${code}'`
      , (error, result) => {
        if(!error) {
          resolve(result)
        } else {
          reject(new Error(error))
        }
      })
    })
  },

  // Patch update data category
  modelPatchCategory: (data, code) => {
    return new Promise ((resolve, reject) => {
      conn.query(`UPDATE tb_category SET ? WHERE code = ?`,[data, code], (error, result) => {
        if(!error) {
          resolve(result)
        } else {
          reject(new Error(error))
        }
      })
    })
  },

  // Delete
  modelDeleteCategory: (code) => {
    return new Promise ((resolve, reject) => {
      conn.query(`DELETE FROM tb_category WHERE code='${code}'`, (error, result) => {
        if(!error) {
          resolve(result)
        } else {
          reject(new Error(error))
        }
      })
    })
  }

}