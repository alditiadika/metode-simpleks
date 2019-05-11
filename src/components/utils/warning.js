import React, { Component } from 'react'
import { Card, CardBody, Button } from 'reactstrap'
import { connect } from 'react-redux'
import { mainType as type } from '../../redux/main/reducer'
const style = {
  width: '40%',
  position: 'fixed',
  left: '30%',
  backgroundColor: '#BDB76B',
  zIndex: 999999
}
class Warning extends Component {
  render() {
    const { warning } = this.props
    return (
      warning.status && (
        <Card style={{ ...style, top: this.props.top }}>
          <CardBody>
            <div>
              <strong>{warning.message}</strong>
            </div>
            <div style={{ marginBottom: '15px' }} />
            <div className='text-right'>
              <Button
                color='primary'
                outline
                onClick={() => this.props.setWarning(false)}
              >
                Close
              </Button>
            </div>
          </CardBody>
        </Card>
      )
    )
  }
}
const mapStateToProps = s => ({
  warning: s.mainReducer.warning
})
const mapDispatchToProps = d => ({
  setWarning: (status, message) =>
    d({ type: type.warningSet, status: status, message: message })
})
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Warning)
