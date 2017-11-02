import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { trainBetweenStations } from '../actions';
import Header from '../components/header';

class TrainBetweenStations extends Component {
	constructor(props) {
		super(props);
		this.state = {
			dataFetched: false,
			loading: false,
			status: {}
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

	renderStatus() {
		return(
			<div>
				Status
				<img className="imgm" src="https://media1.tenor.com/images/0a4fbaea2ade5996d9d6a3d26c3d43f1/tenor.gif?itemid=7640987"/>
			</div>
		);
	}

	renderBlank() {
		return(
			<h3 className="detailBlankMsg">
				Enter details to get all trains between two stations.
			</h3>
		);
	}

	onSubmit(values) {
		this.props.trainBetweenStations(values.source, values.dest, values.date).then((response)=>{console.log(response)});
	}

	render() {
		const { handleSubmit } = this.props;

		return (
			<div>
				<Header/>
				<div className="content">
					<h3>Trains Between Stations</h3>
					<div className="col-md-3">
						<hr/>
						<form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
							<Field
								labelToShow="Source Station: "
								name="source"
								component={this.renderField} 
							/>
							<Field
								labelToShow="Destination Station: "
								name="dest"
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
						{this.state.dataFetched?this.renderStatus():this.renderBlank()}
					</div>
				</div>
			</div>
		);
	}
}

function validate(values) {
	const errors = {};

	if(!values.source){
		errors.source = 'Enter a Source station!';
	}
	if(!values.dest){
		errors.dest = 'Enter a Destinantion station!';
	}
	if(!values.date){
		errors.date = 'Enter Date in dd-mm-yyyy format!';
	}

	return errors;
}

export default reduxForm({
	validate,
	form: 'trainBetweenStationsForm'
})(connect(null,{ trainBetweenStations })(TrainBetweenStations));