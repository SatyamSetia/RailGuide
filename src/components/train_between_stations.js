import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { trainBetweenStations } from '../actions';

class TrainBetweenStations extends Component {

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


	onSubmit(values) {
		this.props.trainBetweenStations(values.source, values.dest, values.date).then((response)=>{console.log(response)});
	}

	render() {
		const { handleSubmit } = this.props;

		return (
			<div>
				<h2>Trains Between Stations</h2>
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