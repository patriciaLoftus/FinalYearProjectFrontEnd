import React from "react";

export default class InputDate extends React.Component {

	handleChange(date) {
        this.props.changeDate(date);
	}

  	render() {
        var ReactDatetime = require("react-datetime");
    	return (
    		<div>
    		<p>Date</p>
    		  <ReactDatetime defaultValue={ReactDatetime.moment()}selected={this.props.date} onChange={this.handleChange.bind(this)} />
    		</div>
    	);
  	}
}
