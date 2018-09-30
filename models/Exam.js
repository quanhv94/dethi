var mongoose = require('mongoose')
var Schema = mongoose.Schema

var ExamSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  questions: [{ type: Schema.Types.ObjectId, ref: 'Question' }],
  answers: [{ type: Schema.Types.ObjectId }],
  score: Number,
  total: Number,
  date: { type: Date, default: Date.now },
  subject: { type: Schema.Types.ObjectId, ref: 'Subject' }
})

module.exports = mongoose.model('Exam', ExamSchema)
