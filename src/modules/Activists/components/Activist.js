import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// Import Actions
import {
  activistFetchRequested,
} from '../../../actions/activists';

// Import Assets
import HomepageBannerImg from '../../../assets/homepage-banner.jpg'

class Activist extends Component {

  componentWillMount() {
    const { dispatch } = this.props;
    dispatch(activistFetchRequested(this.props.match.params.state, this.props.match.params.city, this.props.match.params.activist));
  }

  render() {
    return (
      <div>
        <ul className="list-group media-list media-list-stream mb-4">
          <li className="media">
            <img className="postsview_img" src={HomepageBannerImg} width="100%" alt="" />
          </li>
         </ul>
         {/* Activism Pages List */}
         {this.props.activists.activist ? (
           <div className="card rounded mb-5">
             {this.props.activists.activist.images && this.props.activists.activist.images[0] &&
               <img className="card-img-top" src={'https://' + this.props.activists.activist.images[0]} alt="" />
             }
             <div className = "card-block">
               <h2 className="card-title ml-2">{this.props.activists.activist.title}</h2>
               <p className = "card-text">{this.props.activists.activist.content}</p>
               <hr width="100%" />
               <div className="mb-4">
                 <h6>Stay informed. Sign up for email updates.</h6>
                 <form target="_blank" method="post" action="" width="100%">
                   <div className="input-group">
                     <input type="text" className="form-control" placeholder="Email" />
                     <div className="input-group-btn">
                       <button type="button" className="btn btn-secondary">
                         Submit
                       </button>
                     </div>
                   </div>
                 </form>
               </div>
               <div className="row">
                 <div className="col-8 pt-3">
                   <h6 className="mx-0">Share this and help spread the word.</h6>
                 </div>
                 <div className="col-4">
                   <span className="sharethis-inline-share-buttons"></span>
                 </div>
               </div>
             </div>
           </div>
         ) : (
           <h6 className="ml-2">Sorry, I can't find the requested activist's page.</h6>
         )}
      </div>
    )
  }
}

Activist.propTypes = {
  dispatch: PropTypes.func.isRequired
};

// Retrieve data from store as props
function mapStateToProps(store) {
  return {
    activists: store.activists,
    region: store.region
  };
}

export default connect(mapStateToProps)(Activist);
