const express = require('express')
const app = express()
const cors = require('cors')
const port = process.env.PORT || 8888
const bodyParser = require('body-parser')
const apiRoutes = require('./routes/api')
require('dotenv').config()
require('./config/mongoose')()
require('./config/passport')()

app.use(express.static(__dirname + '/client/build'))
app.use(express.static(__dirname + '/public'))

app.use(cors())
app.use(bodyParser.json())

// api
app.use('/api', apiRoutes)

// response react app
app.get('*', (req, res) => {
  res.sendFile(__dirname + '/client/build/index.html')
})
console.log(__dirname)
app.listen(port, () => {
  console.log('App is running')
});
