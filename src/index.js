import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import App from './components/App';
import rootReducer from './reducers/index.js';

import './index.css';

let storeEnhancers = compose;
if (process.env.NODE_ENV !== 'production') {
  storeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
}
const store = createStore(
  rootReducer,
  storeEnhancers(applyMiddleware(thunk))
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
document.getElementById('root'));

// Service workers, disabled for now.
// import registerServiceWorker from './registerServiceWorker';
// registerServiceWorker();
