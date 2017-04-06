import React from "react";
import ReactSelect from 'react-select';
import 'babel-polyfill';
export default class InputOrigin extends React.Component {
  constructor(props) {
    super();
    this.state = {
      value: "",
      destination: null,
      options: null
    }
    this.getOptions();
  }



	handleChange(event) {
      if (event != null) {
        var value = event.value;
        this.props.changeOrigin(value);
        this.setState({value});
      }
      else {
        var value = null;
        this.props.changeOrigin(value);
        this.setState({value});
      }
	}

  getOrigin() {
    return this.state.value;
  }

  handleDesinationChange(e) {
    if (e != null) {
      var destination = e.value;
      this.props.changeDestination(destination);
      this.setState({destination});
    }
    else {
      this.props.changeDestination(null);
      this.setState({destination:null});
    }
  }

  getOptions() {
		  return fetch('http://localhost:9292/getstops',{  method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    }).then((response) => response.json()).then((json) => {
      this.setState({options: json.options}, function() {});
			return {options: json.options};
		});
  }
  	render() {
    	return (
    		<div>
        <div class = "col-xs-offset-1 col-md-offset-0 col-xs-10 col-md-4">
      		  <p>Origin</p>
      		  <ReactSelect name="Origin Selector" value={this.state.value} options={this.state.options}
              onChange={this.handleChange.bind(this)}/>
          </div>
          <div class = "col-xs-offset-1 col-md-offset-0 col-xs-10 col-md-4">
          <p>Destination</p>
          <ReactSelect value={this.state.destination} onChange={this.handleDesinationChange.bind(this)} options={this.state.options} />
          </div>
    		</div>
    	);
  	}
}
