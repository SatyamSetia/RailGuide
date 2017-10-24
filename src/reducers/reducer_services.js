import { LIVE_STATUS, SEAT_STATUS, TRAIN_ROUTE, TRAIN_BETWEEN_STATIONS } from '../actions';

export default function ServiceReducer(state={}, action) {
	switch(action.type) {
		case LIVE_STATUS :
			//return action.payload.data;
			return action.payload.data;
		case SEAT_STATUS:
			return action.payload.data;
		case TRAIN_ROUTE:
			return action.payload.data;
		case TRAIN_BETWEEN_STATIONS:
			return action.payload.data;
		default :
			//console.log(state);
			return state;
	}
}