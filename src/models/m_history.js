const conn = require('../config/dbconfig')

module.exports = {
  // Create
  modelCreateHistory: (data) => {
    return new Promise ((resolve, reject) => {
      conn.query(`INSERT INTO tb_history (invoices, cashier, cart, amount)
      VALUES ('${data.invoices}','${data.cashier}','${data.cart}','${data.amount}')`
      , (error, result) => {
        if(!error) {
          resolve(result)
        } else {
          reject (new Error(error))
        }
      })
    })
  },

  // Read 
  modelReadHistory: (search, data, pages) => {
    return new Promise ((resolve, reject) => {
      conn.query(`SELECT * FROM tb_history ${search} ${data} ${pages}`, (error, result) => {
        if(!error) {
          resolve(result)
        } else {
          reject (new Error(error))
        }
      })
    })
  },

  modelReadTotalHistory: (search) => {
    return new Promise ((resolve, reject) => {
      conn.query(`SELECT COUNT (*) as total FROM tb_history ${search}`, (error, result) => {
        if(!error) {
          resolve(result)
        } else {
          reject (new Error(error))
        }
      })
    })
  },

  modelDetailHistory: (id) => {
    return new Promise ((resolve, reject) => {
      conn.query(`SELECT * FROM tb_history WHERE id='${id}'`, (error, result) => {
        if(!error) {
          resolve(result)
        } else {
          reject (new Error(error))
        }
      })
    })
  },

  // Update
  modelUpdateHistory: (data, id) => {
    return new Promise ((resolve, reject) => {
      conn.query(`UPDATE tb_history
      SET invoices='${data.invoices}', cashier='${data.cashier}', cart='${data.cart}'
      , amount='${data.amount}' WHERE id='${id}'`
      , (error, result) => {
        if(!error) {
          resolve(result)
        } else {
          reject(new Error(error))
        }
      })
    })
  },

  modelPatchHistory: (data, id) => {
    return new Promise ((resolve, reject) => {
      conn.query(`UPDATE tb_history SET ? WHERE id = ?`,[data, id], (error, result) => {
        if(!error) {
          resolve(result)
        } else {
          reject(new Error(error))
        }
      })
    })
  },

  // delete
  modelDeleteHistory: (id) => {
    return new Promise ((resolve, reject) => {
      conn.query(`DELETE FROM tb_history WHERE id='${id}'`, (error, result) => {
        if(!error) {
          resolve(result)
        } else {
          reject(new Error(error))
        }
      })
    })
  }

}