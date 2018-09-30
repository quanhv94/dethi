const express = require('express')
const Question = require('./../../models/Question')
const Subject = require('./../../models/Subject')
const Exam = require('./../../models/Exam')
const authenticateMidleware = require('./../../middleware/authenticate')
const route = express.Router()

route.get('/generate', (req, res) => {
  let subjectId = req.query.subject_id
  Question.findRandom({ subject: subjectId }, {}, { limit: 50 }, (err, questions) => {
    Subject.findById(subjectId, (err, subject) => {
      if (!subject || !questions || questions.length < 50) {
        res.status(404).send({ errMessage: 'Danh sách câu hỏi đang hoàn thiện.' })
        return
      }
      res.send({ questions, subject })
    })
  })
})

route.get('/:examId', (req, res) => {
  let examId = req.params.examId
  Exam.findById(examId)
    .populate('questions')
    .populate('subject')
    .exec((err, exam) => {
      res.send(exam)
    })
})

route.get('/', authenticateMidleware, (req, res) => {
  Exam.find({
    user: req.user._id
  })
    .populate('subject')
    .exec((err, exam) => {
      res.send(exam)
    })
})

route.post('/', authenticateMidleware, (req, res) => {
  const exam = new Exam({
    ...req.body,
    user: req.user._id
  })
  exam.save((err, result) => {
    res.send(result)
  })
})

module.exports = route
