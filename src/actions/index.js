import axios from 'axios';

const API_KEY = '1mfg12275c';
const ROOT_URL = 'http://api.railwayapi.com/v2/';

export const LIVE_STATUS = 'live_status';

export function liveStatus(trainNum, date) {
	const url = `${ROOT_URL}live/train/${trainNum}/date/${date}/apikey/${API_KEY}`;
	const request = axios.get(url);
	//console.log(request);
	return {
		type : LIVE_STATUS,
		payload : request
	}
}