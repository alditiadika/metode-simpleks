import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Card, CardBody, CardHeader, Row, Col, Input, Button } from 'reactstrap'
import { firstComponentType } from '../redux/standard-eq/reducer'
import { mainType } from '../redux/main/reducer'

class StandardEq extends Component {
  state = { focus: 0 }
  onChange = (key, value) => {
    this.setState({ focus: key }, () => {
      const val = isNaN(parseFloat(value)) ? '' : parseFloat(value)
      this.props.onChange(key, val)
    })
  }
  submit = () => {
    const { matrix } = this.props.constraint
    let validator = []
    matrix.forEach(row => {
      row.forEach(col => {
        if ((col.value === '' || isNaN(col.value)) && col.value !== null)
          validator.push(true)
      })
    })
    validator.includes(true)
      ? this.props.warning(true, 'Masukkan input dengan benar!')
      : this.props.end()
  }
  render() {
    const { isOpenConstraint, constraint } = this.props
    return (
      isOpenConstraint && (
        <Card className='mt-3'>
          <CardHeader>
            <Row>
              <Col>
                <strong>Bentuk Standar Persamaan Constraint</strong>
              </Col>
              <Col className='text-right col-sm-2'>
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
            <div className='table-responsive'>
              <table className='table table-borderless'>
                <tbody>
                  {constraint.matrix.map((row, i) => (
                    <tr key={Math.random()} className='mb-2'>
                      {row.map(col => (
                        <td
                          nowrap='true'
                          style={{
                            margin: 5,
                            padding: 5,
                            [col.key === null ? 'width' : 'minWidth']:
                              col.key === null ? '50px' : '100px'
                          }}
                          key={Math.random()}
                        >
                          {col.key === null ? (
                            <Input
                              value='='
                              disabled
                              style={{
                                backgroundColor: '#162239',
                                color: 'white',
                                borderColor: '#162239'
                              }}
                            />
                          ) : (
                            <Input
                              type='number'
                              autoFocus={
                                this.state.focus === col.key ? true : false
                              }
                              onKeyPress={e =>
                                e.key === 'Enter' && this.submit()
                              }
                              value={col.value}
                              onChange={e =>
                                this.onChange(col.key, e.target.value)
                              }
                            />
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
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
      type: firstComponentType.changeSubEQ,
      payload: { key: key, value: value }
    }),
  warning: (status, message) =>
    d({ type: mainType.warningSet, status: status, message: message }),
  end: () => d({ type: firstComponentType.end })
})
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StandardEq)
