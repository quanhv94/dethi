import React from 'react'
import { Table } from 'reactstrap'
import { Link } from 'react-router-dom'
import moment from 'moment'

class ExamHistory extends React.Component {
  componentDidMount() {
    this.props.fetchExamList()
  }
  render() {
    const props = this.props
    const examList = props.exam.examList
    console.log(examList)
    return (
      <div className="container">
        <h4>Danh sách bài thi đã làm</h4>
        {examList && < Table >
          <thead>
            <tr>
              <th>Môn thi</th>
              <th>Điểm số</th>
              <th>Thời gian</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {examList.map(exam => (
              <tr key={exam._id}>
                <td>{exam.subject && exam.subject.name}</td>
                <td>{exam.score}/{exam.total}</td>
                <td>{moment(exam.date).format('YYYY/MM/DD HH:mm')}</td>
                <td><Link to={`/exam?exam_id=${exam._id}`}>Xem lại</Link></td>
              </tr>)
            )}
          </tbody>
        </Table>}

      </div>
    )
  }
}

export default ExamHistory
