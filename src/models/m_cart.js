const conn = require('../config/dbconfig')

module.exports = {
  // Creat new field data cart
  modelCreateCart: (data) => {
    return new Promise ((resolve, reject) => {
      conn.query(`INSERT INTO tb_cart (invoices, cashier, item, qty, price, subtotal) 
      VALUES ('${data.invoices}','${data.cashier}','${data.item}','${data.qty}','${data.price}','${data.subtotal}')`
      , (error, result) => {
        if(!error) {
          resolve(result)
        } else {
          reject(new Error(error))
        }
      })
    })
  },

  // read all data
  modelReadCart: (search, data, pages) => {
    return new Promise ((resolve, reject) => {
      conn.query(`SELECT * FROM tb_cart ${search} ${data} ${pages}`
      , (error, result) => {
        if(!error) {
          resolve(result)
        } else {
          reject(new Error(error))
        }
      })
    })
  },

  modelReadTotalCart: (search) => {
    return new Promise ((resolve, reject) => {
      conn.query(`SELECT COUNT (*) as total FROM tb_cart ${search}`
      , (error, result) => {
        if(!error) {
          resolve(result)
        } else {
          reject(new Error(error))
        }
      })
    })
  },

  // read detail id
  modelDetailCart: (id) => {
    return new Promise ((resolve, reject) => {
      conn.query(`SELECT * FROM tb_cart WHERE id='${id}'`
      , (error, result) => {
        if(!error) {
          resolve(result)
        } else {
          reject(new Error(error))
        }
      })
    })
  },

  // update
  modelUpdateCart: (data, id) => {
    return new Promise ((resolve, reject) => {
      conn.query(`UPDATE tb_cart
      SET invoices='${data.invoices}', cashier='${data.cashier}', item='${data.item}', qty='${data.qty}' 
      , price='${data.price}', subtotal='${data.subtotal}' WHERE id='${id}'`
      , (error, result) => {
        if(!error) {
          resolve(result)
        } else {
          reject(new Error(error))
        }
      })
    })
  },

  // Delete
  // modelDeleteIdCart: (id) => {
  //   return new Promise ((resolve, reject) => {
  //     conn.query(`DELETE FROM tb_cart WHERE id='${id}'`, (error, result) => {
  //       if(!error) {
  //         resolve(result)
  //       } else {
  //         reject(new Error(error))
  //       }
  //     })
  //   })
  // },

  modelDeleteInvoicesCart: (invoices) => {
    return new Promise ((resolve, reject) => {
      conn.query(`DELETE FROM tb_cart WHERE invoices='${invoices}'`, (error, result) => {
        if(!error) {
          resolve(result)
        } else {
          reject(new Error(error))
        }
      })
    })
  }
}