const express = require('express')
const route = express.Router()
const authRoute = require('./auth')
const subjectRoute = require('./subjects')
const examRoute = require('./exams')
const authenticateMidleware = require('./../../middleware/authenticate')

const Subject = require('./../../models/Subject')
const Question = require('./../../models/Question')
const Exam = require('./../../models/Exam')
const User = require('./../../models/User')
var ObjectID = require('mongodb').ObjectID
const fs = require('fs')

route.use('/auth', authRoute)
route.use('/subjects', subjectRoute)
route.use('/exams', examRoute)
route.get('/setup', setup)

route.get('/me', authenticateMidleware, (req, res) => {
  res.send({ user: req.user })
})

async function setup(req, res) {
  // let subjectCount = await Subject.count()
  // if (subjectCount > 0) {
  //   res.send("App is setup!")
  //   return
  // }
  await Subject.collection.drop(() => { })
  await Question.collection.drop(() => { })
  await Exam.collection.drop(() => { })
  await User.collection.drop(() => { })
  console.log('Starting')

  let english = { name: 'Tiếng Anh', imagePath: '/images/subject/english.jpg', _id: new ObjectID() }
  let chemistry = { name: 'Hóa Học', imagePath: '/images/subject/chemistry.jpg', _id: new ObjectID() }
  let math = { name: 'Toán', imagePath: '/images/subject/math.jpg', _id: new ObjectID() }
  let physic = { name: 'Vật Lý', imagePath: '/images/subject/physic.jpg', _id: new ObjectID() }
  Subject.insertMany([english, chemistry, math, physic], (err) => {
    let questions1 = JSON.parse(fs.readFileSync('./storage/question_en.json'))
    let questions2 = JSON.parse(fs.readFileSync('./storage/question_chem.json'))
    questions1.forEach((question) => {
      question.subject = english._id
      question.answers.forEach(a => {
        a._id = new ObjectID()
      })
    })
    questions2.forEach((question) => {
      question.subject = chemistry._id
      question.answers.forEach(a => {
        a._id = new ObjectID()
      })
    })
    Question.insertMany([...questions1, ...questions2], () => {
      res.send('Done')
    })
  })
}

module.exports = route

