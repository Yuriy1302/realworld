import { combineReducers } from 'redux';

import genericUserReducer from './genericUser';
import genericArticleReducer from './genericArticle';

const genericReducer = combineReducers({
  genericUserReducer,
  genericArticleReducer
});

export default genericReducer;
