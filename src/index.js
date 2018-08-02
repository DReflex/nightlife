import registerServiceWorker from './registerServiceWorker';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import App from './app/app'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import todoApp from './reducers'
import thunk from 'redux-thunk'
import { loadState,saveState } from './localStorage'
import throttle from 'lodash/throttle'
import './index.css'

 const presistedState = loadState()
 const middleware = applyMiddleware(thunk)
 const store = createStore (todoApp, presistedState, middleware)
 const app = document.getElementById('root')
 store.subscribe(throttle(()=>{
   saveState(store.getState());
 }, 1000));
ReactDOM.render(
  <Provider store = {store}>
  <BrowserRouter><App/></BrowserRouter>
  </Provider>
  ,app
)
registerServiceWorker();
