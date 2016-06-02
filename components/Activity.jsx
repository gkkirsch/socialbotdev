import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import Reply from './Reply';
import Like from './Like';

const propTypes = { 
  activity: PropTypes.object.isRequired
};

export default class Activity extends Component {
  renderSocialIcon() {
    const { provider } = this.props.activity;
    let color = '';
    switch (provider) {
      case 'tumblr':
        color = '#2E475E';
        break;
      case 'facebook':
        color = '#2C4388';
        break;
      case 'pinterest':
        color = '#C00018';
        break;
      case 'twitter':
        color = '#25BFFF';
        break;
      case 'instagram':
        color = '#F2BE00';
        break;
      default:
        color = '#000';
    }
    return <i style={{ color }}className={'fa fa-' + provider}></i>;
  }

  renderMessage() {
    const { activity_message } = this.props.activity;
    let message = '';
    if (activity_message.includes('https://')) {
      message = <img className="activity__placeholder" src={activity_message} />;
    } else {
      message = activity_message;
    }
    return message;
  }

  renderComments() {
    const { activity_comments_text } = this.props.activity;
    const comments = activity_comments_text.map((item) => {
      return (
        <div>
          <div className="activity__message">
            {item}
          </div>
          <hr />
        </div>
      );
    });
    return comments;
  }

  render() {
    const { activity } = this.props;
    return (
      <div className="activity">
        <div className="activity__title">
          <img className="activity__pic" src={activity.actor_avator_small} />
          <div>
            <div className="activity__name">{activity.actor_name}</div>
            <div className="activity__username">{activity.actor_username}</div>
            <div className="activity__view">
              <Link to={`/activities/${activity.id}`} className="button button-small">VIEW PROFILE</Link>
            </div>
          </div>
          <div className="activity__provider">
            {this.renderSocialIcon()}
          </div>
        </div>
        <hr />
        <div className="activity__content">
          <div className="activity__date">
            {activity.activity_date}
          </div>
          <br />
          <div className="activity__message">
            {this.renderMessage()}
          </div>
        </div>
        <hr />
        <div className="activity_interact">
          <div className="activity__stats">
            <div>
              <Like activityLiked={activity.activity_liked} id={activity.id} />
              <span className="label">LIKES {activity.activity_likes}</span>
            </div>
            <div>
              <span className="label">SHARES {activity.activity_shares}</span>
            </div>
            <div>
              <span className="label">COMMENTS {activity.activity_comments}</span>
            </div>
          </div>
        </div>
        <hr />
        {this.renderComments()}
        <Reply id={activity.id}/>
      </div>
    );
  }
}

Activity.propTypes = propTypes;
