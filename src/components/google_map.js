import React, { Component } from 'react';

class GoogleMap extends Component {
	
	componentDidMount() {
		var route = this.props.path;
		var source = new google.maps.LatLng(route["0"].station.lat,route["0"].station.lng);
		var routeMap = new google.maps.Map(this.refs.map, {
			zoom: 8,
			center: source
		});
		var trainPath = [];
		route.map((station)=>{
			Geocode(`${station.station.name} railway station`, routeMap, station.station.name, station.distance, station.scharr, station.schdep, trainPath);
		});

		var polyline = new google.maps.Polyline({
		    path: trainPath,
		    geodesic: true,
		    strokeColor: "#0000FF",
		    strokeOpacity: 0.8,
		    strokeWeight: 2
		});

		polyline.setMap(routeMap);


		function Geocode(address, routeMap, stationName, distance, arrival, departure, trainPath) {
			var geocoder = new google.maps.Geocoder();
		    geocoder.geocode({
		        'address': address
		    }, function(results, status) {
		        if (status === google.maps.GeocoderStatus.OK) {
		            var result = results[0].geometry.location;
		            var marker = new google.maps.Marker({
		                position: result,
		            	title: stationName,
		                map: routeMap
		            });

		            trainPath.push(result);
		            var infowindow = new google.maps.InfoWindow({
					    content: `Distance: ${distance} kms, Arrival: ${arrival}, Departure: ${departure}`
					});

					marker.addListener('click', function() {
						infowindow.open(routeMap,marker);
					});
		        } else if (status === google.maps.GeocoderStatus.OVER_QUERY_LIMIT) {    
		            setTimeout(function() {
		                Geocode(address, routeMap, stationName, distance, arrival, departure, trainPath);
		            }, 200);
		        } else {
		            alert("Geocode was not successful for the following reason:" 
		                  + status);
		        }
		    });
		}	
	}

	render(){
		return <div ref="map" className="gMap"/>
	}
}

export default GoogleMap;