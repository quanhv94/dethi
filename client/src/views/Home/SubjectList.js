import React from 'react'
import config from './../../config'
import { Link } from 'react-router-dom'

const SubjectList = (props) => {
  return <div className="container pb20">
    <div className="row">
      {props.subjects.map((subject) => (
        <Link to={`/exam?subject_id=${subject._id}`} key={subject._id} className="col-md-3 col-sm-6 col-xs-12">
          <img src={config.API_DOMAIN + subject.imagePath} alt="subject" width="100%" />
          <h5 className="text-center mt10">{subject.name}</h5>
        </Link>
      ))}
    </div>
  </div>
}

export default SubjectList
