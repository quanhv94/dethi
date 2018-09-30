var mongoose = require('mongoose')
var Schema = mongoose.Schema

var SubjectSchema = new Schema({
  name: String,
  imagePath: String,
})

module.exports = mongoose.model('Subject', SubjectSchema)
