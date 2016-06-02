import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { likeComment } from '../actions/ActivityActions';

const propTypes = {
  id: PropTypes.string.isRequired,
  activityLiked: PropTypes.number.isRequired,
  dispatch: PropTypes.func.isRequired
};

class Like extends Component {
  constructor(props) {
    super(props);
    this.handleCommentLike = this.handleCommentLike.bind(this);
    this.renderIcon = this.renderIcon.bind(this);
  }

  handleCommentLike() {
    this.props.dispatch(likeComment(this.props.id));
  }

  renderIcon() {
    let icon = '';
    if (this.props.activityLiked) {
      icon =  
      <i
        style={{ color: '#71B371'}}
        className="fa fa-thumbs-up"
        onClick={this.handleCommentLike}
      >
      </i>
    } else {
      icon =
      <i
        className="fa fa-thumbs-o-up"
        onClick={this.handleCommentLike}
      >
      </i>
    }
    return icon;

  }

  render() {
    return (
      <div className="activity__like">
        {this.renderIcon()}
      </div>
    );
  }
}

Like.propTypes = propTypes;

export default connect()(Like);
