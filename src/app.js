import React, { Component } from 'react'
import { Container } from 'reactstrap'

import Main from './components/main'
import Warning from './components/utils/warning'
import First from './components/1-standard-eq'
import Second from './components/2-constraint-eq'

export default class extends Component {
  state = {
    top: 100
  }
  componentWillMount() {
    window.addEventListener('scroll', () => {
      const top = window.pageYOffset || document.documentElement.scrollTop
      this.setState({
        top: 100 + top
      })
    })
  }
  render() {
    return (
      <Container style={{ width: '80%' }} className='mt-3'>
        <Warning top={this.state.top} />
        <Main />
        <First />
        <Second />
      </Container>
    )
  }
}
