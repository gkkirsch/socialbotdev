import React, { Component, PropTypes } from 'react';
import Plotly from 'plotly.js/lib/core';

Plotly.register([
  require('plotly.js/lib/scattergeo')
]);

const propTypes = {
  data: PropTypes.array,
  layout: PropTypes.object,
  config: PropTypes.object
};

export default class PlotlyContainer extends Component {

  componentDidMount() {
    const { data, layout, config } = this.props;
    Plotly.plot(this.container, data, layout, config);
  }


  shouldComponentUpdate() {
    return true;
  }

  componentDidUpdate() {
    const { data, layout, config } = this.props;
    Plotly.plot(this.container, data, layout, config);
  }

  render() {
    const { data, layout, config, ...other } = this.props;

    return (
      <div
        style={{ width: 800, height: 500, margin: 'auto' }}
        {...other}
        ref={(node) => this.container = node}
      />
    );
  }

}

PlotlyContainer.propTypes = propTypes;
