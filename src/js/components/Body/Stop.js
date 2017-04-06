import React from "react";

export default class Stop extends React.Component {
  constructor(props) {
    super();
  }
  render() {
    return (<div className = "marker">
        {this.props.text}
      </div>);
  }
}
