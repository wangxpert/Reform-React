import React, { Component } from 'react'
import PropTypes from 'prop-types'

// Import Components
import { Modal, ModalBody } from 'reactstrap'

import Button from '../../../../components/Button'

const btnStyle = { width: '100%' }

class AddCommentDialog extends Component {

  constructor(props) {
    super(props)

    this.state = {
      content: ''
    }

    this.onSave = this.onSave.bind(this)
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
            Add Comment
            <i className="fa fa-times float-right close-button" onClick={ this.props.toggle  }></i>
          </div>
          <form onSubmit={ this.onSave }>
            <div className="dialog-body pb-0">
              <div className="form-group">
                <label className="ml-2" htmlFor="content" style={{ fontSize: '1.1em' }}>Please enter the content of comment</label>
                <textarea className="form-control" id="content" rows="4" value={ this.state.content } onChange={ e => this.setState({ content: e.target.value }) } required></textarea>
              </div>
            </div>
            <div className="dialog-footer">
              <Button style={ btnStyle }>
                Add
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
  toggle: PropTypes.func.isRequired,
  save: PropTypes.func.isRequired
}

export default AddCommentDialog
