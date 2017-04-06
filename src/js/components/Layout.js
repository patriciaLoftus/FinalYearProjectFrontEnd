import React from "react";
import Results from "./Body/Results";
import Footer from "./Footer";
import Header from "./Header";
import Graph from "./Body/Graph";
import Map from "./Body/Map";
import MainContainer from "./Body/MainContainer";



export default class Layout extends React.Component {
  constructor() {
    super();
    this.state = {
      title: "",
    };
  }

  changeTitle(title) {
    this.setState({title});
  }

  sendParams(origin,destination,date) {
    this.results.makeResults(origin,destination,date);
    this.graph.makeGraph(origin,destination,date);
  }

  sdkfj() {
    return(<div>
      <MainContainer ref = {(main) => {this.main = main}} sendParams= {this.sendParams.bind(this)}/>
    <div className = "row">
      <div className = 'col-xs-12 col-md-6'>
        <Results ref= {(results) => {this.results = results}}/>
      </div>
      <div className = 'col-xs-12 col-md-6'>
        <Graph ref= {(graph) => {this.graph = graph}}/>
      </div>
    </div> </div>);
  }

  render() {
    return (
      <div className = "container">
        <Header/>
          {this.sdkfj()}
        <Footer/>
      </div>
    );
  }
}
