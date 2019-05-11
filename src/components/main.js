import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Row, Col, Card, CardBody, CardHeader, Input, Button } from 'reactstrap'

import { firstComponentType } from '../redux/standard-eq/reducer'
import { mainType } from '../redux/main/reducer'

class MainComponent extends Component {
  state = {
    nVar: 0
  }
  onChange = e => {
    this.setState({
      nVar: e.target.value
    })
  }
  submit = () => {
    const { nVar } = this.state
    !isNaN(nVar) && nVar > 0 && nVar <= 10 && this.props.setVar(parseInt(nVar))
    nVar > 10 && this.props.setWarning(true, 'Maksimal 10 variabel!')
  }
  render() {
    return (
      <Card>
        <CardHeader>
          <strong>
            Metode Simpleks{' '}
            {this.state.nVar > 0 && this.state.nVar <= 10
              ? this.state.nVar
              : 'n'}{' '}
            variabel
          </strong>
        </CardHeader>
        <CardBody>
          <Row>
            <Col className='col-sm-3 pt-1'>
              <small>Masukkan Jumlah Variabel</small>
            </Col>
            <Col>
              <Input
                type='number'
                autoFocus
                style={{ width: '100%' }}
                value={this.state.nVar}
                onChange={this.onChange}
                onKeyPress={e => e.key === 'Enter' && this.submit()}
              />
            </Col>
            <Col className='col-sm-2'>
              <Button
                style={{ width: '100%' }}
                color='warning'
                outline
                onClick={this.submit}
              >
                <span>
                  <i className='mr-2'>Submit</i>
                  <img src={require('../assets/icons/done.svg')} alt='' />{' '}
                </span>
              </Button>
            </Col>
          </Row>
        </CardBody>
      </Card>
    )
  }
}
const mapDispatchToProps = d => ({
  setVar: n => d({ type: firstComponentType.set, payload: n }),
  setWarning: (status, message) =>
    d({ type: mainType.warningSet, status: status, message: message })
})
const mapStateToProps = s => ({ ...s })
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainComponent)
