import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { liveStatus } from '../actions';
import Header from '../components/header';
import Message from '../error_message';

class LiveTrainStatus extends Component {
	constructor(props) {
		super(props);
		this.state = {
			dataFetched: false,
			loading: false,
			status: {},
		};
	}
	
	renderField(field) {
		const { meta: {touched, error}} = field;
		const className = `form-group ${touched && error? 'has-danger':''}`;

		return (
			<div className={className}>
				<label>{field.labelToShow}</label>
				<input
					className="form-control"
					type="text"
					{...field.input}
				/>
				<div className="text-help">
					{touched?error:''}
				</div>
			</div>
			);
	}

	renderLoader() {
		return (
			<div className="loader">
				<img src="https://cdn.dribbble.com/users/108390/screenshots/2882839/spinner-loop.gif"/>
			</div>
		);
	}

	renderStatus() {
		var status = this.state.status;
		var response_code = status.response_code;
		if(response_code!=200){
			return (
				<h3 className="detailMessage">
					Error: {Message(response_code)}
				</h3>
			);
		}

		var route = status.route;
		var current = status.current_station.no;
		return(
			<div>
				<h5 className="train-name col-md-6">{status.train.number}/{status.train.name}</h5>
				<h5 className="start-date col-md-6">Start Date: {status.start_date}</h5>
				<h3 className="position">{status.position}</h3>
				<table className="table table-sm table-hover">
				  <thead className="thead-default">
				    <tr>
				      <th>#</th>
				      <th>Station</th>
				      <th>Day</th>
				      <th>Scheduled Arr</th>
				      <th>Actual Arr</th>
				      <th>Status</th>
				    </tr>
				  </thead>
				  <tbody>
				    {this.renderRoute(route,current)}
				  </tbody>
				</table>
			</div>
		);
	}

	renderRoute(route,current) {
		return route.map((station) => {
			var className = '';

			if(station.no<current){
				className = 'arrived';
			}else if(station.no==current){
				className = 'just-arrived';
			}else{
				className = 'not-arrived';
			}
			return (
				<tr key={station.no} className={className}>
					<td>{station.no}</td>
					<td>{station.station.name} ({station.station.code})</td>
					<td>{station.day+1}</td>
					<td>{station.scharr}</td>
					<td>{station.actarr}</td>
					<td>{station.status}</td>
				</tr>
			);
		});
	}

	renderBlank() {
		return(
			<h3 className="detailMessage">
				Enter details to get live running status of train.
			</h3>
		);
	}

	onSubmit(values) {
		this.setState({loading: true});
		this.props.liveStatus(values.trainNum, values.date).then((response)=>{this.setState({'dataFetched':true, loading: false, 'status': response.payload.data})});
		//console.log(this.state.status);	
	}

	render() {
		const { handleSubmit } = this.props;

		return (
			<div>
				<Header />
				<div className="content">
					<h3>Live Train Status</h3>
					<div className="col-md-3">
						<hr/>
						<form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
							<Field 
								labelToShow="Train Number: "
								name="trainNum"
								component={this.renderField}
							/>
							<Field 
								labelToShow="Date: "
								name="date"
								component={this.renderField}
							/>
							<button type="submit" className="btn btn-primary">Submit</button>
						</form>
					</div>
					<div className="col-md-9 details">
						{this.state.loading?this.renderLoader():(this.state.dataFetched?this.renderStatus():this.renderBlank())}
					</div>
				</div>
				<div className="footer primaryColor"></div>		
			</div>);
	}
}

function validate(values) {
	const errors = {};

	if(!values.trainNum){
		errors.trainNum = "Enter Train Number!";
	}
	if(!values.date){
		errors.date = "Enter date in dd-mm-yyyy format!";
	}

	return errors;
}

export default reduxForm({
	validate,
	form: 'liveTrainStatusForm'
})(
	connect(null, { liveStatus })(LiveTrainStatus)
);