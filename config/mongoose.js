
const mongoose = require('mongoose')

module.exports = function () {
  mongoose.Promise = global.Promise
  mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true })
}
