const jwt = require('jsonwebtoken')
const User = require('./../models/User')

module.exports = (req, res, next) => {
  var token = req.body.token || req.query.token || req.headers['authorization']
  if (!token) {
    return res.status(401).send({
      success: false,
      message: 'No token provided.'
    })
  }

  jwt.verify(token, process.env.APP_SECRET, function (err, decoded) {
    if (err) {
      return res.status(401).send({ success: false, err: err })
    }
    User.findById(decoded.id, function(err, user) {
      req.user = user
      next()
    })
  })
}
