const express = require('express')
const route = express.Router()
const Subject = require('./../../models/Subject')

route.get('/', async function (req, res) {
  let subjects = await Subject.find()
  res.send({ subjects })
})

module.exports = route
