const express = require('express')
const route = express.Router()
const passport = require('passport')

route.post('/facebook', passport.authenticate('facebook-token', { session: false }), function (req, res) {
  let user = req.user
  let token = user.generateToken()
  res.send({ user, token })
})

route.post('/google', passport.authenticate('google-token', { session: false }), function (req, res) {
  let user = req.user
  let token = user.generateToken()
  res.send({ user, token })
})

module.exports = route
