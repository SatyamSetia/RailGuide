import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { trainRoute } from '../actions';
import Header from '../components/header';
import GoogleMap from '../components/google_map';
import Message from '../error_message';

class TrainRoute extends Component {
	constructor(props) {
		super(props);
		this.state = {
			dataFetched: false,
			loading: false,
			data: {}
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
		var data = this.state.data;
		var response_code = data.response_code;
		if(response_code!=200){
			return (
				<h3 className="detailMessage">
					Error: {Message(response_code)}
				</h3>
			);
		}

		var days = data.train.days;
		var latlon = {'lat': 51.508742,'lon':-0.12085}
		var classes = data.train.classes;
		var route = data.route;
		return(
			<div>
				<h5 className="train-name">{data.train.number}/{data.train.name}</h5>
				<div className="col-md-5">
					<table className="table table-sm">
					  <thead className="thead-default">
					    <tr>{this.renderItemsCode(days)}</tr>
					  </thead>
					  <tbody>
					    <tr>{this.renderDayRuns(days)}</tr>
					  </tbody>
					</table>
				</div>
				<div className="col-md-2"></div>
				<div className="col-md-5">
					<table className="table table-sm">
					  <thead className="thead-default">
					    <tr>{this.renderItemsCode(classes)}</tr>
					  </thead>
					  <tbody>
					    <tr>{this.renderClassAvailability(classes)}</tr>
					  </tbody>
					</table>
				</div>
				<Tabs selectedTabPanelClassName="tab-panel" selectedTabClassName="select-tab">
				    <TabList className="tab-list">
				      <Tab className="col-md-6 btn btn-primary">Schedule</Tab>
				      <Tab className="col-md-6 btn btn-primary">Route Map</Tab>
				    </TabList>

				    <TabPanel>
				        <table className="table table-sm table-hover">
						    <thead className="thead-default">
						    	<tr>
							     	<th>#</th>
							        <th>Station</th>
							        <th>Distance</th>
							        <th>Day</th>
							        <th>Arrival</th>
							        <th>Departure</th>
							    </tr>
							</thead>
							<tbody>
								{this.renderRouteTable(route)}
							</tbody>
						</table>
				    </TabPanel>
				    <TabPanel>
				      <GoogleMap path={route}/>
				    </TabPanel>
				</Tabs>
			</div>
		);
	}

	renderItemsCode(items) {
		return items.map((item) => {
			return (
				<th key={item.code}>
					{item.code}
				</th>
			);
		});
	}

	renderDayRuns(days) {
		return days.map((day) => {
			return (
				<td key={day.code}>
					{day.runs}
				</td>
			);
		});
	}

	renderClassAvailability(classes) {
		return classes.map((eachClass) => {
			return (
				<td key={eachClass.code}>
					{eachClass.available}
				</td>
			);
		});
	}

	renderRouteTable(route) {
		return route.map((station) => {
			return (
				<tr key={station.no}>
					<td>{station.no}</td>
					<td>{station.station.name} ({station.station.code})</td>
					<td>{station.distance} kms</td>
					<td>{station.day}</td>
					<td>{station.scharr}</td>
					<td>{station.schdep}</td>
				</tr>
			);
		});
	}

	renderBlank() {
		return(
			<h3 className="detailMessage">
				Enter details to get route of train.
			</h3>
		);
	}


	onSubmit(values) {
		this.setState({loading: true});
		this.props.trainRoute(values.trainNum).then((response)=>{this.setState({'dataFetched':true, loading: false, data: response.payload.data })});
	}

	render() {
		const { handleSubmit } = this.props;

		return (
			<div>
				<Header/>
				<div className="content">
					<h3>Train Route</h3>
					<div className="col-md-3">
						<hr/>
						<form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
							<Field
								labelToShow="Train Number: "
								name="trainNum"
								component={this.renderField} 
							/>
							<button type="submit" className="btn btn-primary">Submit</button>
						</form>
					</div>
					<div className="col-md-9 details">
						{this.state.loading?this.renderLoader():(this.state.dataFetched?this.renderStatus():this.renderBlank())}
					</div>
				</div>
			</div>
		);
	}
}

function validate(values) {
	const errors = {};

	if(!values.trainNum){
		errors.trainNum = 'Enter train number!';
	}

	return errors;
}

export default reduxForm({
	validate,
	form: 'trainRouteForm'
})(connect(null,{ trainRoute })(TrainRoute));