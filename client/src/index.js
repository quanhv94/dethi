import React from 'react'
import ReactDOM from 'react-dom'
import App from './views/App'
import registerServiceWorker from './registerServiceWorker'
import { Router } from 'react-router-dom'
import history from './history'
import { Provider } from 'react-redux'
import configureStore from './store/configureStore'
import 'bootstrap/dist/css/bootstrap.min.css'
import './css/index.css'

const store = configureStore()
ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>
  , document.getElementById('root'))
registerServiceWorker()
