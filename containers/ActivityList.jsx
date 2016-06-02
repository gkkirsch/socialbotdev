import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import Activity from '../components/Activity';
import _ from 'lodash';

const propTypes = { 
  actions: PropTypes.object.isRequired,
  activityList: PropTypes.array.isRequired
};

class ActivityList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.renderActivities = this.renderActivities.bind(this);
  }

  getPaginatedItems(items, pageNumber) {
    let per_page = 20;
    let offset = (pageNumber - 1) * per_page;
    let paginatedItems = _.rest(items, offset).slice(0, per_page);
    return {
      page: pageNumber,
      per_page: per_page,
      total: items.length,
      total_pages: Math.ceil(items.length / per_page),
      data: paginatedItems
    };
  }

  renderActivities() {
    const { activityList, page } = this.props;
    let list = _.sortBy(activityList, 'actor_name')
    let paginatedItem = this.getPaginatedItems(list, page)
    let activities = paginatedItem.data.map((item, key) => {
      return (
        <Activity
          key={key}
          page={paginatedItem.page}
          perPage={paginatedItem.per_page}
          total={paginatedItem.total}
          totalPages={paginatedItem.total_pages}
          activity={item}
        />
      )
    })
    return activities
  }

  render() {
    return (
      <div className="activities">
        {this.renderActivities()}
      </div>
    );
  }
}


function mapStateToProps(state) {
  return {
    activityList: state.activity.list,
    page: state.activity.page
  }
}

ActivityList.propTypes = propTypes;

export default connect(mapStateToProps)(ActivityList)

