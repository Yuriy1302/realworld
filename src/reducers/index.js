import { combineReducers } from 'redux';

import userReducer from './user';
import articlesReducer from './articles';
import genericReducer from './generic';

const rootReducer = combineReducers({
  userReducer,
  articlesReducer,
  genericReducer
});

export default rootReducer;
