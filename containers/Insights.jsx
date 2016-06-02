import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Plotly from '../components/Plotly'

const propTypes = { 
};

class Insights extends Component {
  componentDidMount() {
  }

  renderChart() {
    const data = this.props.data.filter((item) => {
      if (item.activity_longitude) {
        return item
      }
    })
    const long = data.map((item) => {
      return item.activity_longitude
    })
    const lat = data.map((item) => {
      return item.activity_latitude
    })
    const plot = {
      data: [
        {
          type:'scattergeo',
          locationmode: 'ISO-3',
          lon: long,
          lat: lat,
          mode: 'markers',
          hoverinfo: 'none',
          marker: {
            size: 8,
            opacity: 0.8,
            reversescale: true,
            autocolorscale: false,
            symbol: 'circle',
            line: {
                width: 1,
                color: 'rgb(102,102,102)'
            },
          }
        }
      ],
      layout: {
        geo: {
          scope: 'north america',
          projection: {
            type: 'conic conformal',
            rotation: {
              long: -200
            }
          },
          showland: true,
          landcolor: 'rgb(250,250,250)',
          subunitcolor: 'rgb(217,217,217)',
          countrycolor: 'rgb(217,217,217)',
          countrywidth: 0.5,
          subunitwidth: 0.5
        }
      },
      config: {
        showLink: false,
        displayModeBar: false
      }
    };
    return plot;
  }

  render() {
    const plot = this.renderChart();
    return (
      <div className="container">
        <div className="insights">
          <div className="insights__title">
            Activities by Location
          </div>
          <hr />
          <div className="chart">
            <Plotly data={plot.data} layout={plot.layout} config={plot.config}/>
          </div>
        </div>
      </div>
    );
  }
}


function mapStateToProps(state) {
  return {
    data: state.activity.list,
  }
}

Insights.propTypes = propTypes;

export default connect(mapStateToProps)(Insights)

