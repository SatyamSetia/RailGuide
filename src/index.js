import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import promise from 'redux-promise';

import App from './components/app';
import LiveTrainStatus from './components/live_train_status';
import SeatAvailability from './components/seat_availability';
import reducers from './reducers';

const createStoreWithMiddleware = applyMiddleware(promise)(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <BrowserRouter>
    	<div>
    		<Switch>
    			<Route path="/live" component={LiveTrainStatus}/>
    			<Route path="/seat" component={SeatAvailability}/>
    			<Route path="/" component={App}/>
    		</Switch>
    	</div>
    </BrowserRouter>
  </Provider>
  , document.querySelector('.container'));
