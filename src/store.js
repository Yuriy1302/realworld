import { createStore, applyMiddleware/* , compose */ } from 'redux';
import thunk from 'redux-thunk';

/* import reducer from './reducers'; */
import rootReducer from './reducers';


/* const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk))); */


// !!! const store = createStore(reducer, applyMiddleware(thunk));
const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;