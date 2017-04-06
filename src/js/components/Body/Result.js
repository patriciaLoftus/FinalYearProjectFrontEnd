import * as React from "react";
export default class Result extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <tr>
        <td>{this.props.id}</td>
        <td>{this.props.time} minutes</td>
      </tr>
    );  
  }
}
