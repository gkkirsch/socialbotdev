import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import * as ActivityActions from '../actions/ActivityActions';
import { bindActionCreators } from 'redux';

const propTypes = {
  state: PropTypes.object.isRequired,
  children: PropTypes.object.isRequired
};

class App extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.actions.listActivity();
  }

  render() {
    const { children } = this.props;
    return (
      <div className="main">
        <div className="header">
          <div className="header__logo">
            <Link to={`/activities`} className="button button-blue">SOCIALBOT</Link>
            <Link to={`/activities`} className="nav">ACTIVITES</Link>
            <Link to={`/insights`} className="nav">INSIGHTS</Link>
          </div>
        </div>
        { children }
      </div>
    );
  }
}

App.propTypes = propTypes;

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(ActivityActions, dispatch) }
}

export default connect((state) => ({ state }), mapDispatchToProps)(App);

