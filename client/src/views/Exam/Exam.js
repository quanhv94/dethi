import React from 'react'
import qs from 'qs'
import { Button } from 'reactstrap'
import SweetAlert from 'react-bootstrap-sweetalert'
import classNames from 'classnames'
import Timer from './../Share/Timer'
import moment from 'moment'
import { Prompt } from 'react-router-dom'

class Exam extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedAnswer: [],
      started: false,
      finished: false,
      showConfirmFinish: false,
      showFinshedResult: false,
      correctCount: 0,
    }
  }
  componentDidMount() {
    const query = qs.parse(this.props.location.search.slice(1))
    if (query.subject_id) {
      this.props.generateExam(query.subject_id)
    } else if (query.exam_id) {
      this.props.fetchExam(query.exam_id)
      this.setState({ started: true, finished: true })
    }
  }

  selectAnswer = (index, answerId) => {
    if (this.state.finished) return
    let selectedAnswer = this.state.selectedAnswer
    selectedAnswer[index] = answerId
    this.setState({ selectedAnswer })
  }

  finishExam = () => {
    let correctCount = 0
    const exam = this.props.exam.exam
    exam.questions.forEach((question, index) => {
      var answer = question.answers.filter(x => x.isCorrect)[0]
      if (answer && answer._id === this.state.selectedAnswer[index]) {
        correctCount++
      }
    })
    this.setState({
      showConfirmFinish: false,
      finished: true,
      showFinshedResult: true,
      correctCount
    })
    this.props.auth.user && this.props.saveExam({
      questions: exam.questions.map(x => x._id),
      answers: this.state.selectedAnswer,
      score: correctCount,
      total: exam.questions.length,
      subject: exam.subject._id
    })
  }

  convertString(string) {
    return string.replace(/__([^_]+?)__/g, "<u>$1</u>")
      .replace(/\*\*(.*?)\*\*/g, "<i>$1</i>")
  }

  renderQuestions = (question, index) => (
    <div className="mb10" key={question._id}>
      <div className="mb5">
        <b>Câu {index + 1}: </b>
        <span dangerouslySetInnerHTML={{ __html: this.convertString(question.content) }}></span>
      </div>
      <div>
        {question.answers.map(answer => (
          <div key={answer._id}
            className={classNames({
              answer: true,
              selected: this.state.selectedAnswer.includes(answer._id),
              correct: this.state.finished && answer.isCorrect
            })}
            onClick={() => { this.selectAnswer(index, answer._id) }}
          >
            <span dangerouslySetInnerHTML={{ __html: this.convertString(answer.content) }}></span>
          </div>
        ))}
      </div>
    </div>
  )

  render() {
    const props = this.props
    if (props.exam.fetching)
      return (
        <div className="container">
          <p>Đang tải dữ liệu...</p>
        </div>
      )

    if (props.exam.errMessage)
      return (
        <div className="container">
          <p>{props.exam.errMessage}</p>
        </div>
      )

    const exam = props.exam.exam
    if (!exam) return null

    return (
      <div className="container">
        <h4 className="mb20">
          Bài thi môn: {exam.subject.name}.
          Thời gian làm bài:  {' '}
          <Timer time={3000} onFinish={this.finishExam} run={this.state.started && !this.state.finished} />
        </h4>
        {exam.date && <p>{moment(exam.date).format('YYYY/MM/DD HH:mm')}</p>}
        {!this.state.started && (
          <Button color="primary" onClick={() => { this.setState({ started: true }) }}>Bắt đầu</Button>
        )}
        {this.state.started && (
          <div>
            <div className="question-list mb20">
              {exam.questions.map(this.renderQuestions)}
            </div>
            {!this.state.finished && <Button color="success"
              onClick={() => this.setState({ showConfirmFinish: true })}>Nộp bài</Button>}
          </div>
        )}
        <SweetAlert
          show={this.state.showConfirmFinish}
          warning
          showCancel
          confirmBtnText="Đồng ý!"
          cancelBtnText="Hủy!"
          confirmBtnBsStyle="danger"
          cancelBtnBsStyle="default"
          title="Thông báo?"
          onConfirm={this.finishExam}
          onCancel={() => { this.setState({ showConfirmFinish: false }) }}
        >
          Bạn có chắc chắn muốn nộp bài.
        </SweetAlert>
        <SweetAlert
          show={this.state.showFinshedResult}
          confirmBtnText="Đồng ý!"
          title="Kết quả"
          onConfirm={() => { this.setState({ showFinshedResult: false }) }}
        >
          Kết quả làm bài: {this.state.correctCount}/{exam.questions.length}
        </SweetAlert>
        <Prompt
          when={this.state.started && !this.state.finished}
          message='Bài thi chưa hoàn thành. Bạn có chắc chắn muốn rời đi?'
        />
      </div>
    )
  }
}

export default Exam
