import React from "react";
import GoogleMapReact from 'google-map-react';
import Stop from "./Stop";

export default class Map extends React.Component {
  constructor(props) {
    super();
    this.state = {
      options: [],
      stops:[]
    };
    this.getOptions();
  }

  static defaultProps = {
    center: {lat: 53.349805, lng: -6.260310},
    zoom: 11
  };

  getOptions() {
		  return fetch('http://localhost:9292/getstopsandpositions',{  method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    }).then((response) => response.json()).then((json) => {
      this.setState({options: json.options}, function() {});
      this.makeOptions();
			return {options: json.options};
		});
  }

  getStops() {
    this.state.stops
  }


  makeOptions() {
    var stopsArray = [];
    for (let i = 0; i < this.state.options.length; ++i) {
      stop = this.state.options[i];
      stopsArray.push(
        <Stop
          key = {i}
          lat={stop.lat}
          lng={stop.lon}
          text={stop.name}
        />);
    }
    this.setState({stops: stopsArray}, function(){});
    console.log('all dones frens');
    console.log(stopsArray.length);
  }

    setStops(stops){

      //  bootstrapURLKeys={{
      //    key: 'AIzaSyDtVlbCY8pE1GOLEMbnEKzo0S0CrDfdQ0c'}}
    }
  render() {
    return (
      <div className = "full" >
      <GoogleMapReact
        defaultCenter={[53.323066, -6.239635]}
        defaultZoom={11}>
        <Stop   lat={53.323066}
          lng={-6.239635}
          text={'a'}/>
      </GoogleMapReact>
      </div>
    );
  }
}
