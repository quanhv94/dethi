import React from 'react'
import qs from 'qs'

const Search = (props) => (
  <div className="container">
    <div className="col-xs-12">
      <h3>
        Tìm kiếm cho từ khóa <i>{qs.parse(props.location.search.slice(1)).q}</i>
      </h3>
    </div>
  </div>
)

export default Search
