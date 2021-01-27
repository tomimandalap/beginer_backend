const conn = require('../config/dbconfig')

module.exports = {
  // Creat new field data category
  modelCreatCategory: (data) => {
    return new Promise ((resolve, reject) => {
      conn.query(`INSERT INTO tb_category 
      VALUES ('${data.category}','${data.description}')`
      , (error, result) => {
        if(!error) {
          resolve(result)
        } else {
          reject(new Error(error))
        }
      })
    })
  },

  // Read all field table category redis
  modelReadCategoryRedis: () => {
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

  // Read all field table product
  modelReadCategory: (search, sorted, pages) => {
    return new Promise ((resolve, reject) => {
      conn.query(`SELECT * FROM tb_category ${search} ${sorted} ${pages}`
      , (error, result) => {
        if(!error) {
          resolve(result)
        } else {
          reject(new Error(error))
        }
      })
    })
  },

  // count total row table category
  modelReadTotalCategory: (search) => {
    return new Promise ((resolve, reject) => {
      conn.query(`SELECT COUNT (*) as total FROM tb_category ${search}`
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
  modelDetailCategory: (category) => {
    return new Promise ((resolve, reject) => {
      conn.query(`SELECT * FROM tb_category WHERE category='${category}'`
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
  modelUpdateCategory: (data, category) => {
    return new Promise ((resolve, reject) => {
      conn.query(`UPDATE tb_category SET description='${data.description}' 
      WHERE category='${category}'`
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
  modelPatchCategory: (data, category) => {
    return new Promise ((resolve, reject) => {
      conn.query(`UPDATE tb_category SET ? WHERE category = ?`,[data, category], (error, result) => {
        if(!error) {
          resolve(result)
        } else {
          reject(new Error(error))
        }
      })
    })
  },

  // Delete
  modelDeleteCategory: (category) => {
    return new Promise ((resolve, reject) => {
      conn.query(`DELETE FROM tb_category WHERE category='${category}'`, (error, result) => {
        if(!error) {
          resolve(result)
        } else {
          reject(new Error(error))
        }
      })
    })
  }

}