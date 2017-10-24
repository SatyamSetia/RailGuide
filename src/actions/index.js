import axios from 'axios';

const API_KEY = '1mfg12275c';
const ROOT_URL = 'http://api.railwayapi.com/v2/';

export const LIVE_STATUS = 'live_status';
export const SEAT_STATUS = 'seat_status';
export const TRAIN_ROUTE = 'train_route' ;
export const TRAIN_BETWEEN_STATIONS = 'trainBetweenStations';

export function liveStatus(trainNum, date) {
	const url = `${ROOT_URL}live/train/${trainNum}/date/${date}/apikey/${API_KEY}`;
	const request = axios.get(url);
	//console.log(request);
	return {
		type : LIVE_STATUS,
		payload : request
	}
}

export function seatAvailability(trainNum, source, dest, date, seatClass, quota) {
	const url = `${ROOT_URL}check-seat/train/${trainNum}/source/${source}/dest/${dest}/date/${date}/class/${seatClass}/quota/${quota}/apikey/${API_KEY}`;
	const request = axios.get(url);

	return {
		type: SEAT_STATUS,
		payload: request
	}
}

export function trainRoute(trainNum) {
	const url = `${ROOT_URL}route/train/${trainNum}/apikey/${API_KEY}`;
	const request = axios.get(url);

	return {
		type: TRAIN_ROUTE,
		payload: request
	}
}

export function trainBetweenStations(source, dest, date) {
	const url = `${ROOT_URL}between/source/${source}/dest/${dest}/date/${date}/apikey/${API_KEY}`;
	const request = axios.get(url);

	return {
		type: TRAIN_BETWEEN_STATIONS,
		payload: request
	}
}