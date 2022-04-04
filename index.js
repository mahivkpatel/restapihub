// Import express
let express = require('express')
// Import Body parser
let bodyParser = require('body-parser')
// Import Mongoose
let mongoose = require('mongoose')
// Initialize the app
let app = express()

// Import routes
let apiRoutes = require('./api-routes')
// Configure bodyparser to handle post requests
app.use(bodyParser.urlencoded({ extended: true }))

app.use(bodyParser.json())

// CORS
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE')
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization',
  )
  next()
})

mongoose.connect('mongodb://localhost/restapihub', {
  useNewUrlParser: true,
})

var db = mongoose.connection

// Added check for DB connection
if (!db) console.log('Error connecting db')
else console.log('Db connected successfully')
var port = process.env.PORT || 3004
app.get('/', (req, res) => res.send('Hello World with Express'))

// Use Api routes in the App
app.use('/api', apiRoutes)
app.listen(port, () => {
  console.log('Runing on port: ' + port)
})
