import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import * as ActivityActions from '../actions/ActivityActions';
import { bindActionCreators } from 'redux';

const propTypes = { 
  actions: PropTypes.object.isRequired,
};

class Profile extends Component {
  componentDidMount() {
    this.props.actions.retrieveProfile(this.props.params.id);
  }

  render() {
    const { profile } = this.props
    return (
      <div className="container">
        <div className="profile">
          <div className="profile__title">
            <img className="profile__pic" src={profile.actor_avator} />
            <div>
              <div className="profile__name">{profile.actor_name}</div>
              <div className="profile__username">{profile.actor_username}</div>
            </div>
          </div>
          <hr />
          <div className="profile__info">
            <div className="label">DESCRIPTION</div>
            <div className="profile__description">{profile.actor_description}</div>
            <div className="label">URL</div>
            <a className="profile__url" href={profile.actor_url}>{profile.actor_url}</a>
          </div>
        </div>
      </div>
    );
  }
}


function mapStateToProps(state) {
  return {
    profile: state.activity.item,
  }
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(ActivityActions, dispatch) }
}

Profile.propTypes = propTypes;

export default connect(mapStateToProps, mapDispatchToProps)(Profile)

