const mysql = require('mysql2')

const conn = mysql.createConnection ({
  host: process.env.DBHOST,
  user: process.env.DBUSER,
  password: process.env.DBPASS,
  database: process.env.DB
})

module.exports = conn