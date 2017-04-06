import * as React from "react";
import Loading from "react-loading";
import Chart from  'react-highcharts';

export default class Graph extends React.Component {
  constructor(props) {
    super();
    this.state = {
      data: null,
      hasError: false,
      loading: false
    }
  }

  parseResults(json) {
    var results =  [];
    if (json.error == 'null') {
      this.setState({hasError:false});
      var data = json.values;
      console.log("setting state");
      this.setState({data});
      this.setState({loading:false}, function() {});
    }
    else {
      this.setState({hasError:true});
      this.setState({loading:false}, function() {});
    }
  }

  async makeGraph(origin,destination,date) {
    this.setState({loading:true}, function() {});
    var json = await this.getValuesCall(origin,destination,date);
    console.log(json);
    this.parseResults(json);
  }

  async getValuesCall(origin,destination,datetime) {
    try{
      let response = await fetch('http://localhost:9292/graph',{
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

  render() {
    var config = {
      chart: {
        type: 'spline'
      },
      rangeSelector: {
            selected: 1
        },
      title: {
        text: 'Average Times'
      },
      xAxis: {
        categories: ['6am','7am','8am','9am','10am','11am','12pm',
                  '1pm','2pm','3pm','4pm','5pm','6pm','7pm','8pm','9pm','10pm','11pm']
      },
      yAxis: {
        title: {
          text: 'Duration (Minutes)'
        }
      },
      series: [{
        name: 'Time',
        data: this.state.data,
        tooltip:{
          valueDecimal:2
        }
      }]
    };
    if (this.state.data != null) {
      return (<div className = "main_component"> <Chart config={config}/> </div>);
    }
    else if (this.state.loading) {
      return (
        <div className = "main_component">
          <Loading type='spinningBubbles' color='black'/>
        </div>);
    }
    else {
      return null;
    }
  }

}
