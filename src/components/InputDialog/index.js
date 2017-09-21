import React, { Component } from 'react'
import PropTypes from 'prop-types'

// Import Components
import { Modal, ModalBody } from 'reactstrap'

import Button from '../Button'

const btnStyle = { width: '100%' }

class AddCommentDialog extends Component {

  constructor(props) {
    super(props)

    this.state = {
      content: props.defaultValue ? props.defaultValue : ''
    }

    this.onSave = this.onSave.bind(this)
  }

  componentWillMount() {
    this.setState({ content: this.props.defaultValue ? this.props.defaultValue : '' })
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isOpen !== this.props.isOpen && nextProps.isOpen) {
      this.setState({ content: nextProps.defaultValue })
    }
  }

  onSave(e) {
    e.preventDefault()
    this.props.save(this.state.content)
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
          <form onSubmit={ this.onSave }>
            <div className="dialog-body pb-0">
              <div className="form-group">
                <label className="ml-2" htmlFor="content" style={{ fontSize: '1.1em' }}>{ this.props.content }</label>
                <textarea className="form-control" id="content" rows="4" value={ this.state.content } onChange={ e => this.setState({ content: e.target.value }) } required autoFocus></textarea>
              </div>
            </div>
            <div className="dialog-footer">
              <Button style={ btnStyle }>
                { this.props.buttonTitle }
              </Button>
            </div>
          </form>
        </ModalBody>
      </Modal>
    )
  }
}

AddCommentDialog.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  buttonTitle: PropTypes.string.isRequired,
  defaultValue: PropTypes.string,

  toggle: PropTypes.func.isRequired,
  save: PropTypes.func.isRequired
}

export default AddCommentDialog
