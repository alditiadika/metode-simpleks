import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Card, CardHeader, CardBody, Row, Col, Button } from 'reactstrap'

import { MathEQ } from './utils/math-eq'

class ReadOnlyComponent extends Component {
  render() {
    const { isReadOnly, constraint } = this.props
    return (
      isReadOnly && (
        <Card className='mt-3'>
          <CardHeader>
            <Row>
              <Col>
                <strong>Bentuk Standar Persamaan</strong>
              </Col>
              <Col className='text-right'>
                <Button color='warning' autoFocus outline>
                  Solusi
                </Button>
              </Col>
            </Row>
          </CardHeader>
          <CardBody>
            {constraint.stringEQ.map(row => (
              <Row key={Math.random()} className='text-center'>
                <Col>
                  <small>
                    <MathEQ eq={row} />
                  </small>
                </Col>
              </Row>
            ))}
          </CardBody>
        </Card>
      )
    )
  }
}
const mapStateToProps = state => ({ ...state.firstComponentReducer })
export default connect(mapStateToProps)(ReadOnlyComponent)
