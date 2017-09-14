import React, { Component } from 'react'

// Import Components
import InfiniteScroll from 'react-infinite-scroller'

import PageBlock from '../Pages/components/PageBlock'

const FETCH_LIMIT = 50
class MyPages extends Component {

  constructor(props) {
    super(props)

    this.loadPages = this.loadPages.bind(this)
  }

  componentWillMount() {
    const idToken = this.props.session.idToken.jwtToken

    this.props.resetMyPages()
    this.props.getMyPages(FETCH_LIMIT, null, idToken)
  }

  loadPages() {
    if (this.props.state === 'GETTING_MYPAGES') return

    const idToken = this.props.session.idToken.jwtToken

    this.props.getMyPages(FETCH_LIMIT, this.props.myPages.lastKey, idToken)
  }

  render() {

    if (!this.props.myPages) return null

    const { pages, lastKey } = this.props.myPages

    let renderPages = null
    if (pages) {
      renderPages = pages.map((ele, index) => (
        <PageBlock key={ index } activist={ ele } onClick={ e => this.props.changeLocation(`/activism/pages/${ ele.id }`) } />
      ))
    }

    return (
      <div className="activism-pages mt-5 mb-5">
        <h2 className="ml-3 mt-2 p-3">My Activism Pages</h2>
        {/* Pages */}
        <div className="col px-auto">
          { (pages && pages.length) ?
            (
              <div className="px-auto px-md-2">
                <h6 className='ml-2' > Select an activism page from the list below </h6>
                <InfiniteScroll
                  pageStart={ 0 }
                  loadMore={ this.loadPages }
                  hasMore={ lastKey !== undefined }
                  loader={ <div className="loader">Loading ...</div> } >
                  { renderPages }
                </InfiniteScroll>
              </div>
            ) : (
              <h6 className='ml-2' > Sorry, there are no activist pages to show. </h6>
            )
          }
        </div>

      </div>
    )
  }

}

export default MyPages
