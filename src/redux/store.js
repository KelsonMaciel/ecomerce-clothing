import  { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';

import rootRedeucer from './root-redux';

const middleware = [logger];

const store = createStore(rootRedeucer, applyMiddleware(...middleware))

export default store;