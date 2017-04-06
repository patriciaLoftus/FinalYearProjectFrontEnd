import * as React from "react";
import Loading from "react-loading";
import Result from "./Result.js"
import 'babel-polyfill';
export default class Results extends React.Component {
  constructor(props) {
    super();
    this.state = {
      result: [],
      loading: false,
      hasResult: false,
      weather: null,
      hasError: false,
      error:null
    }
  }

  parseResults(json) {
    var results =  [];
    if (json.error == 'null') {
      this.setState({hasError:false});
      this.setState({weather: json.weather});
      var times = json.time;
      for (let i = 0 ; i < times.length; ++i) {
        var time = times[i];
        results.push(
          <Result key = {i} id={time.id} time={time.time}/>
        );
      }
      this.setState({results});
    }
    else {
      console.log(json.error);
      this.setState({hasError:true});
      this.setState({error:json.error});
    }
  }

  async makeResults(origin,destination,date) {
    this.setState({loading:true}, function() {});
    var json = await this.getApiCall(origin,destination,date);
    this.parseResults(json);
    this.setState({loading:false}, function() {});
    this.setState({hasResult:true}, function() {});
  }

  async getApiCall(origin,destination,datetime) {
    try{
      let response = await fetch('http://localhost:9292/api',{
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "timestamp": datetime.unix(),
          "origin": origin,
          "destination": destination
        })
      });
      let responseJson = await response.json();
      return responseJson;
  }catch(error) {
      console.error(error);
    }
  }

  getWeather() {
    if (this.state.weather == null) {
      return null;
    }
    if (this.state.weather) {
      return (<p> Predicted weather : Rain </p>);
    }
    return (<p> Predicted weather :  Dry </p>);
  }

  getContent() {
    if (this.state.loading) {
      return (
          <div className = "main_component">
            <Loading type='spinningBubbles' color='black' className = 'col-offset-xs-5 col-xs-1'/>
          </div>
      );
    }
    if (this.state.hasResult){
      if (this.state.hasError) {
        return (
          <div className = "main_component">
            <h3> Results </h3>
            {this.state.error}
          </div>
        );
      }
      return (
        <div className = "main_component">
          <h3> Results </h3>
          <table class="table results">
          <thead>
            <tr>
            <th>Bus Route</th>
            <th>Predicted Duration</th>
            </tr>
        </thead>
        <tbody>
          {this.state.results}
        </tbody>
        </table>
        </div> );
    }
    return null;
  }

  render() {
      return (
        <div>
          {this.getContent()}
        </div>
      );
  }
}
