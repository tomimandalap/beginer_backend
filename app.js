require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const routeProduct = require('./src/router/r_product')
const routeCategory = require('./src/router/r_category')
const routeHistory = require('./src/router/r_history')
const routeCart = require('./src/router/r_cart')
const app = express()

// client
let whiteList = [
  'http://localhost:5000'
]

let corsOption = {
  origin: function (origin, callback) {
    if (whiteList.indexOf(origin) !== -1 || !origin) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

app.use(cors(corsOption))

// parse request
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get("/", (req, res) => {
  res.json({
    message: "Welcom to Project Fast Food"
  })
})

// ROUTE
app.use(routeProduct)
app.use(routeCategory)
app.use(routeCart)
app.use(routeHistory)

// server
const PORT = process.env.PORT
app.listen( PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})