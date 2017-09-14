import React, { Component } from 'react'
import PropTypes from 'prop-types'

// Import Components
import { Modal, ModalBody } from 'reactstrap'

import Button from '../Button'

const btnStyle = { width: '100px' }
const textStyle = { fontSize: '1.1em' }

class ConfirmDialog extends Component {

  constructor(props) {
    super(props)

    this.state = {
      content: ''
    }

    this.onYes = this.onYes.bind(this)
  }

  onYes(e) {
    e.preventDefault()
    this.props.confirm()
    this.props.toggle()
  }

  render() {
    return (
      <Modal isOpen={ this.props.isOpen } toggle={ this.props.toggle } className={ this.props.className } >
        <ModalBody>
          <div className="dialog-header">
            { this.props.title }
            <i className="fa fa-times float-right close-button" onClick={ this.props.toggle  }></i>
          </div>
          <form onSubmit={ this.onYes }>
            <div className="dialog-body pb-0">
              <div className="px-1" style={ textStyle }>{ this.props.content }</div>
            </div>
            <div className="dialog-footer text-right mt-3 mb-1">
              <Button className="mx-1 py-1" type="submit" style={ btnStyle }>
                Yes
              </Button>
              <Button className="mx-1 py-1" type="button" style={ btnStyle } onClick={ this.props.toggle }>
                No
              </Button>
            </div>
          </form>
        </ModalBody>
      </Modal>
    )
  }
}

ConfirmDialog.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,

  toggle: PropTypes.func.isRequired,
  confirm: PropTypes.func.isRequired
}

export default ConfirmDialog
