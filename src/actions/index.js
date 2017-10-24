import axios from 'axios';

const API_KEY = '1mfg12275c';
const ROOT_URL = 'http://api.railwayapi.com/v2/';

export const LIVE_STATUS = 'live_status';
export const SEAT_STATUS = 'seat_status';

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