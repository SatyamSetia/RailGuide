import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import ServiceReducer from './reducer_services';

const rootReducer = combineReducers({
  service: ServiceReducer,
  form: formReducer
});

export default rootReducer;
