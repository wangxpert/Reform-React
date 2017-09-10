import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

// Import Components

// Import styles

class TabBar extends Component {

  onTab(to) {
    this.props.history.push(to)
  }

  render() {
    const { location } = this.props
    const page = location.pathname.split('/')[1]

    return (
      <div className="tabbar">
        <div className="container mr-3" style={{ marginLeft: '-16px' }}>
          <div className="row">
            <div className="col-12 col-md-8">
              <div className={ `col-6 tab ${ page === 'post' ? 'active' : '' }` } onClick={ e => this.onTab('/post') }>
                Posts
              </div>
              <div className={ `col-6 tab ${ page !== 'post' ? 'active' : '' }` } onClick={ e => this.onTab('/activism') }>
                Activism Pages
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(TabBar)
