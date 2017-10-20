import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Services from '../services';

export default class App extends Component {
	
	renderServices(){
		return (
			Services.map((Service) => {
				//console.log(service)
				return (
					<div key={Service.name}>
						<Link to={Service.route}>
							<h5>{Service.name}</h5>
						</Link>
					</div>
				);
			})
		);
	}

    render() {
    	return <div>{this.renderServices()}</div>

    }
}
