const conn = require('../config/dbconfig')

module.exports = {
  // Creat new field data product
  modelCreatProduct: (data) => {
    return new Promise ((resolve, reject) => {
      conn.query(`INSERT INTO tb_product (code, name, image, price) 
      VALUES ('${data.code}','${data.name}','${data.image}','${data.price}')`
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
  modelReadProduct: (search, order, pages, category) => {
    return new Promise ((resolve, reject) => {
      conn.query(`SELECT * FROM tb_product ${search} ${order} ${pages} ${category}`
      , (error, result) => {
        if(!error) {
          resolve(result)
        } else {
          reject(new Error(error))
        }
      })
    })
  },

  // Read detail product 
  modelDetailProdcut: (id) => {
    return new Promise ((resolve, reject) => {
      conn.query(`SELECT * FROM tb_product WHERE id='${id}'`
      , (error, result) => {
        if(!error) {
          resolve(result)
        } else {
          reject(new Error(error))
        }
      })
    })
  },

  // Update data product
  modelUpdateProduct: (data, id) => {
    return new Promise ((resolve, reject) => {
      conn.query(`UPDATE tb_product 
      SET code='${data.code}', name='${data.name}', image='${data.image}', price='${data.price}' 
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

  // Patch update data prodcut
  modelPatchProduct: (data, id) => {
    return new Promise ((resolve, reject) => {
      conn.query(`UPDATE tb_product SET ? WHERE id = ?`,[data, id], (error, result) => {
        if(!error) {
          resolve(result)
        } else {
          reject(new Error(error))
        }
      })
    })
  },

  // Delete
  modelDeleteProduct: (id) => {
    return new Promise ((resolve, reject) => {
      conn.query(`DELETE FROM tb_product WHERE id='${id}'`, (error, result) => {
        if(!error) {
          resolve(result)
        } else {
          reject(new Error(error))
        }
      })
    })
  }
}