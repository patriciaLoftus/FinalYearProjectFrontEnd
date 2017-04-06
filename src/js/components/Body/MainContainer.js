import * as React from "react";
import InputOrigin from "./InputOrigin"
import InputDate from "./InputDate"
import moment from "moment"


export default class MainContainer extends React.Component {

	constructor() {
    super();
    var moment = require('moment');
    this.state = {
      origin: null,
      destination: null,
      date:moment()
    };
    console.log("start: " + this.state.date);
  }

	getOrigin() {
    return this.state.origin;
  }

	getDate() {
    return this.state.date;
  }

	getDestination() {
    return this.state.destination;
  }

  changeDate(date) {
    this.setState({date}, function () {});
  }

  changeOrigin(origin) {
    this.setState({origin},function () {});
  }

  changeDestination(destination) {
  	this.setState({destination},function () {});
  }

	submit() {
		if (this.state.origin != null && this.state.destination != null) {
			this.props.sendParams(this.state.origin,this.state.destination, this.state.date);
		}else {
			console.log("null--  origin:"  + this.state.origin + "destination: " + this.state.destination);
		}
	}

  render() {
    return (
			<div className = "main_component">
      		<div className = "row center">
      			<InputOrigin  changeOrigin = {this.changeOrigin.bind(this)}
             changeDestination = {this.changeDestination.bind(this)}/>
          	<div className = "col-xs-offset-1 col-md-offset-0 col-xs-10 col-md-4">
            	<InputDate changeDate = {this.changeDate.bind(this)} />
          	</div>
      		</div>
        	<div className = "row extra">
						<div className = "col-md-offset-5 col-xs-offset-3 col-xs-6 col-md-2">
        			<button onClick= {this.submit.bind(this)}>Submit</button>
						</div>
        	</div>
			</div>
    );
  }
}
