import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { seatAvailability } from '../actions';

class SeatAvailability extends Component {

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
		this.props.seatAvailability(values.trainNum, values.source, values.dest, values.date, values.seatClass, values.quota).then((response)=>{console.log(response)});
	}

	render() {
		const { handleSubmit } = this.props;

		return (
			<div>
				<h2>Seat Availability</h2>
				<form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
					<Field
						labelToShow="Train Number: "
						name="trainNum"
						component={this.renderField} 
					/>
					<Field
						labelToShow="Source Station: "
						name="source"
						component={this.renderField} 
					/>
					<Field
						labelToShow="Destination: "
						name="dest"
						component={this.renderField} 
					/>
					<Field
						labelToShow="Date: "
						name="date"
						component={this.renderField} 
					/>
					<Field
						labelToShow="Class: "
						name="seatClass"
						component={this.renderField} 
					/>
					<Field
						labelToShow="Quota: "
						name="quota"
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

	// values.map((value) => {
	// 	if(!value){
	// 		error.value = `${value.name} can not be blank!`;
	// 	}
	// })

	return errors;
}

export default reduxForm({
	validate,
	form: 'seatAvailabilityForm'
})(connect(null,{ seatAvailability })(SeatAvailability));