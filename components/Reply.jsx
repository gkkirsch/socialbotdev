import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { submitComment } from '../actions/ActivityActions';

const propTypes = {
  id: PropTypes.number.isRequired,
  dispatch: PropTypes.func.isRequired
};

class Reply extends Component {
  constructor(props) {
    super(props);
    this.handleCommentChange = this.handleCommentChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = { comment: '' };
  }

  handleSubmit() {
    const form = {
      comment: this.state.comment,
      id: this.props.id
    };
    this.props.dispatch(submitComment(form));
    this.setState({ comment: '' });
  }

  handleCommentChange(e) {
    this.setState({
      comment: e.target.value
    });
  }

  render() {
    return (
      <div>
        <textarea
          onChange={this.handleCommentChange}
          className="textarea"
          placeholder="Write a comment..."
          value={this.state.comment}
        />
        <div onClick={this.handleSubmit} className="button button-blue button-small">COMMENT</div>
      </div>
    );
  }
}

Reply.propTypes = propTypes;

export default connect()(Reply);
