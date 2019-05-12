import React, { Component } from 'react'
import { Container } from 'reactstrap'

import Warning from './components/utils/warning'
import Loadable from 'react-loadable'
const Loading = () => {
  return (
    <div className='text-center'>
      <div className='lds-dual-ring' />>
    </div>
  )
}
const Main = Loadable({
  loader: () => import('./components/main'),
  loading: Loading
})
const First = Loadable({
  loader: () => import('./components/1-standard-eq'),
  loading: Loading
})
const Second = Loadable({
  loader: () => import('./components/2-constraint-eq'),
  loading: Loading
})
const Third = Loadable({
  loader: () => import('./components/3-read-only-eq'),
  loading: Loading
})

export default class extends Component {
  state = {
    top: 100
  }
  render() {
    return (
      <Container style={{ width: '80%' }} className='mt-3'>
        <Warning top={this.state.top} />
        <Main />
        <First />
        <Second />
        <Third />
        <div style={{ height: '800px' }} />
      </Container>
    )
  }
}
