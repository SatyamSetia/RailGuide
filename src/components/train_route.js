import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { trainRoute } from '../actions';

class TrainRoute extends Component {

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
		this.props.trainRoute(values.trainNum).then((response)=>{console.log(response)});
	}

	render() {
		const { handleSubmit } = this.props;

		return (
			<div>
				<h2>Train Route</h2>
				<form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
					<Field
						labelToShow="Train Number: "
						name="trainNum"
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

	if(!values.trainNum){
		errors.trainNum = 'Enter train number!';
	}

	return errors;
}

export default reduxForm({
	validate,
	form: 'trainRouteForm'
})(connect(null,{ trainRoute })(TrainRoute));