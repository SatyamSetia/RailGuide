import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Services from '../services';
import Header from './header';

export default class App extends Component {
	
	renderServices(){
		return (
			Services.map((Service) => {
				//console.log(service)
				return (
					<div key={Service.name} className="col-md-4">
						<div className="card">
							<Link to={Service.route}>
								<img className="card-img-top" src={Service.icon} />
								<div className="card-body">
									<h5 className="card-title">{Service.name}</h5>
								</div>
							</Link>
						</div>
					</div>
				);
			})
		);
	}

    render() {
    	return (
    		<div>
    			<Header />
    			<div className="content">{this.renderServices()}</div>
    			<div className="footer primaryColor"></div>
    		</div>
    	);
    }
}
