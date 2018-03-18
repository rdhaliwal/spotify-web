import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import App from './components/App';
import rootReducer from './reducers/index.js';

import './index.css';

let store = createStore(rootReducer);
if (process.env.NODE_ENV !== 'production') {
  store = createStore(
   rootReducer,
   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );
}

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
document.getElementById('root'));

// Service workers, disabled for now.
// import registerServiceWorker from './registerServiceWorker';
// registerServiceWorker();
