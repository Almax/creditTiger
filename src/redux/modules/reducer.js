import { combineReducers } from 'redux';
import multireducer from 'multireducer';
import { routerReducer } from 'react-router-redux';
import {reducer as reduxAsyncConnect} from 'redux-async-connect';

import auth from './auth';
import counter from './counter';
import {reducer as form} from 'redux-form';
import info from './info';
import widgets from './widgets';
import cards from './cards';
import filter from './filter';
import sort from './sort';
import routes from './routes';
import points from './points';
import view from './view';
import learnMore from './learnMore';

export default combineReducers({
  routing: routerReducer,
  reduxAsyncConnect,
  auth,
  cards,
  form,
  filter,
  learnMore,
  points,
  routes,
  sort,
  view,
  multireducer: multireducer({
    counter1: counter,
    counter2: counter,
    counter3: counter
  }),
  info,
  widgets
});
