function Message(response_code) {
	switch(response_code){
		case 210: return 'Train doesn’t run on the date queried.';
		case 211: return 'Train doesn’t have journey class queried.';
		case 220: return 'Flushed PNR.';
		case 221: return 'Invalid PNR.';
		case 304: return 'Data couldn’t be fetched. No Data available.';
		case 404: return 'Data couldn’t be fetched. Request couldn’t go through.';
		case 504: return 'Argument error.';
		case 704: return 'Unauthorized user query. User account expired/exhausted or unregistered.';
	}
}

export default Message;