var mongoose = require('mongoose')
var Schema = mongoose.Schema
var random = require('mongoose-simple-random');

var QuestionSchema = new Schema({
  content: String,
  answers: [{
    _id: Schema.Types.ObjectId,
    content: String,
    isCorrect: Number
  }],
  subject: { type: Schema.Types.ObjectId, ref: 'Subject' }
})

QuestionSchema.plugin(random)
module.exports = mongoose.model('Question', QuestionSchema)
