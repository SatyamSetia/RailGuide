import React, { Component } from 'react';

class GoogleMap extends Component {
	
	componentDidMount() {
		var route = this.props.path;
		var source = new google.maps.LatLng(route["0"].station.lat,route["0"].station.lng);
		var routeMap = new google.maps.Map(this.refs.map, {
			zoom: 8,
			center: source
		});
		var geocoder = new google.maps.Geocoder();
		var trainPath = [];
		route.map((station)=>{
			setTimeout(2000);
			var marker;
			geocoder.geocode( { 'address': `${station.station.name} railway station`}, function(results, status) {
		     	// if(status == 'OVER_QUERY_LIMIT'){
		     	// 	setTimeout(2000);
		     	// 	status = 'OK';
		     	// }

		     	if (status == 'OK') {
		     		
		        	routeMap.setCenter(results[0].geometry.location);
		        	marker = new google.maps.Marker({
		            	map: routeMap,
		            	title: `${station.station.name}`,
		            	position: results[0].geometry.location
		        	});
		        	
		        	var infowindow = new google.maps.InfoWindow({
					    content: `Distance: ${station.distance} kms, Arrival: ${station.scharr}, Departure: ${station.schdep}`
					});

					marker.addListener('click', function() {
						infowindow.open(routeMap,marker);
					});
					console.log(station.station.name);
		      	}else{
		        	alert('Geocode was not successful for the following reason: ' + status);
		      	}
		      	trainPath.push(marker.getPosition());
		    });

			
		});

		new google.maps.Polyline({
		    path: trainPath,
		    strokeColor: "#0000FF",
		    strokeOpacity: 0.8,
		    strokeWeight: 2
		}).setMap(routeMap);	
	}

	render(){
		return <div ref="map" className="gMap"/>
	}
}

export default GoogleMap;