import { routeReducer } from 'react-router-redux';
import { combineReducers } from 'redux';
import { activity } from './ActivityReducer';

const rootReducer = combineReducers({
  activity,
  routeReducer,
  routing: routeReducer
});

export default rootReducer;
