import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { liveStatus } from '../actions';

class LiveTrainStatus extends Component {
	constructor(props) {
		super(props);
		this.state = {
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

	onSubmit(values) {
		this.props.liveStatus(values.trainNum, values.date).then((response)=>{this.setState({'status': response.payload.data})});
	}

	render() {
		const { handleSubmit } = this.props;

		return (
			<div>
				<h2>Live train Status</h2>
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
				<h3>{this.state.status!={}?this.state.status.position:''}</h3>
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