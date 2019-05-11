import React, { Component } from 'react'
import reactDOM from 'react-dom'
import { Provider } from 'react-redux'

import store from './redux/store'
import App from './app'

import './assets/all.css'

class Index extends Component {
  render() {
    return (
      <Provider store={store}>
        <App />
      </Provider>
    )
  }
}

reactDOM.render(<Index />, document.getElementById('root'))
