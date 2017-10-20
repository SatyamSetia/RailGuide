import { LIVE_STATUS } from '../actions';

export default function ServiceReducer(state={}, action) {
	switch(action.type) {
		case LIVE_STATUS :
			//return action.payload.data;
			return action.payload.data;
		default :
			//console.log(state);
			return state;
	}
}