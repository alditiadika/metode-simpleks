import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Card, CardBody, CardHeader, Row, Col, Input, Button } from 'reactstrap'
import { MathEQ } from './utils/math-eq'
import { firstComponentType } from '../redux/standard-eq/reducer'
import { mainType } from '../redux/main/reducer'
class StandardEq extends Component {
  state = { focus: 0, show: false }
  onChange = (i, e) => {
    this.setState({ focus: i, show: false }, () => {
      const val = isNaN(parseFloat(e)) ? '' : parseFloat(e)
      this.props.onChange(i, val)
    })
  }
  submit = () => {
    const validatorNull = this.props.optimalEq.map(a => a.value).includes('')
    if (validatorNull) {
      this.props.warning(true, 'Input tidak valid, isi semua data dengan benar')
    } else {
      this.setState({ show: true })
      this.props.next()
    }
  }
  render() {
    const { isOpen, optimalEq } = this.props
    return (
      isOpen && (
        <Card className='mt-3'>
          <CardHeader>
            <Row>
              <Col>
                <strong>
                  Bentuk Standar Persamaan Optimalisasi
                  {this.state.show && ':'}
                </strong>
                {this.state.show && (
                  <small style={{ marginLeft: 15 }}>
                    <MathEQ
                      eq={`F (x_0, x_1, x_2 ...) = ${generator(optimalEq)}`}
                    />
                  </small>
                )}
              </Col>
              <Col className='col-sm-2 text-right'>
                <Button
                  style={{ width: '100%' }}
                  onClick={this.submit}
                  color='warning'
                >
                  <span>
                    <i className='mr-2'>Submit</i>
                    <img src={require('../assets/icons/done.svg')} alt='' />
                  </span>
                </Button>
              </Col>
            </Row>
          </CardHeader>
          <CardBody>
            <Row>
              <Col className='mb-2'>
                <small>
                  Masukkan Koefisien dari persamaan yang akan di optimalisasi
                </small>
              </Col>
            </Row>
            <Row>
              <div className='table-responsive'>
                <table className='table table-borderless'>
                  <tbody>
                    <tr>
                      {optimalEq.map(item => (
                        <td
                          nowrap='true'
                          style={{
                            margin: 5,
                            padding: 5,
                            [item.key === null ? 'width' : 'minWidth']:
                              item.key === null ? '50px' : '100px'
                          }}
                          key={Math.random()}
                        >
                          <Input
                            type='number'
                            autoFocus={
                              item.key === this.state.focus ? true : false
                            }
                            style={{ width: '100%' }}
                            value={item.value}
                            onKeyPress={e => e.key === 'Enter' && this.submit()}
                            onChange={e =>
                              this.onChange(item.key, e.target.value)
                            }
                          />
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            </Row>
          </CardBody>
        </Card>
      )
    )
  }
}
const mapStateToProps = state => ({ ...state.firstComponentReducer })
const mapDispatchToProps = d => ({
  onChange: (key, value) =>
    d({
      type: firstComponentType.changeMainEQ,
      payload: { key: key, value: value }
    }),
  warning: (status, message) =>
    d({ type: mainType.warningSet, status: status, message: message }),
  next: () => d({ type: firstComponentType.next })
})
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StandardEq)
const generator = arr => {
  let a = ''
  for (let i = 0; i < arr.length; i++) {
    a =
      i > 0
        ? a +
          (arr[i].value >= 0
            ? `+ ${Math.abs(arr[i].value)}`
            : `- ${Math.abs(arr[i].value)}`) +
          `x_${i}`
        : a + arr[i].value + `x_${i}`
  }
  return a
}
