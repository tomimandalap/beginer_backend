const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const {envPORT} = require('./src/helpers/nv')

const routerUser = require('./src/router/r_user')
const routeProduct = require('./src/router/r_product')
const routeCategory = require('./src/router/r_category')
const routeHistory = require('./src/router/r_history')
const routeCart = require('./src/router/r_cart')
const app = express()

// client
// let whiteList = [
//   'http://localhost:3030'
// ]

// let corsOption = {
//   origin: function (origin, callback) {
//     if (whiteList.indexOf(origin) !== -1 || !origin) {
//       callback(null, true)
//     } else {
//       callback(new Error('Not allowed by CORS'))
//     }
//   }
// }

// parse request
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors())

// Set default
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to Project CRUD REST API"
  })
})

// ROUTE
app.use(routerUser)
app.use(routeProduct)
app.use(routeCategory)
app.use(routeCart)
app.use(routeHistory)

// Set for check file
app.use('/image', express.static('./public/img'))

// server
app.listen( envPORT || 3000, cors(),  () => {
  console.log(`Server is running on http://localhost:${envPORT || 3000}`)
})