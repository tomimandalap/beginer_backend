const conn = require('../config/dbconfig') 

module.exports = 
{
  // CREATE
  modelCreateCart : (data, subtotal) => {
    return new Promise ((resolve, reject) => {
      conn.query(`INSERT INTO tb_cart (receipt, cashier, payment, product, incart, price, subtotal)
      VALUES ('${data.receipt}','${data.cashier}','${data.payment}','${data.product}',
      '${data.incart}','${data.price}','${subtotal}')`
      , (error, result) => {
        if(!error) {
          resolve(result)
        } else {
          reject(new Error(error))
        }
      })
    })
  }, 

  // READ
  modelReadCart: () => {
    return new Promise ((resolve, reject) => {
      conn.query(`SELECT * FROM tb_cart`, (error, result) => {
        if(!error) {
          resolve(result)
        } else {
          reject(new Error(error))
        }
      })
    })
  },

  modelDetailCart: (id) => {
    return new Promise ((resolve, reject) => {
      conn.query(`SELECT * FROM tb_cart WHERE id='${id}'`, (error, result) => {
        if(!error) {
          resolve(result)
        } else {
          reject(new Error(error))
        }
      })
    })
  },

  // UPDATE
  modelUpdatecart: (data, id) => {
    return new Promise ((resolve, reject) => {
      conn.query(`UPDATE tb_cart 
      SET receipt='${data.receipt}', cashier='${data.cashier}', payment='${data.payment}', 
      product='${data.product}', incart='${data.incart}', price='${data.price}' , subtotal='${data.subtotal}'
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

  modelPatchCart: (data, id) => {
    return new Promise ((resolve, reject) => {
      conn.query(`UPDATE tb_cart SET ? WHERE id = ?`,[data, id], (error, result) => {
        if(!error) {
          resolve(result)
        } else {
          reject(new Error(error))
        }
      })
    })
  },

  // DELET
  modelDeleteCart: (row, receipt) => {
    return new Promise ((resolve, reject) => {
      conn.query(`DELETE FROM tb_cart ${row} ${receipt}`, (error, result) => {
        if(!error) {
          resolve(result)
        } else {
          reject(new Error(error))
        }
      })
    })
  }

}