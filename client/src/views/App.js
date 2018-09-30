import React, { Component } from 'react'
import Header from './Layout/HeaderContainer'
import Footer from './Layout/Footer'
import Home from './Home/HomeContainer'
import Loading from './Layout/LoadingContainer'
import Search from './Search/Search'
import Exam from './Exam/ExamContainer'
import ExamHistory from './ExamHistory/ExamHistoryContainer'
import NotFound from './NotFound/NotFound'
import { Switch, Route } from 'react-router-dom'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <div className="page-wrapper">
          <Switch>
            <Route path='/' exact component={Home} />
            <Route path='/search' component={Search} />
            <Route path='/exam' component={Exam} />
            <Route path='/exam-history' component={ExamHistory} />
            <Route component={NotFound} />
          </Switch>
        </div>
        <Footer />
        <Loading />
      </div>
    )
  }
}

export default App
