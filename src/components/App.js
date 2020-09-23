import React, { Component } from "react";
import ExcelReader from "./utils/ExcelReader";

class App extends Component {
  constructor() {
    super();
    this.state = {
      name: "React",
    };
  }

  render() {
    return (
      <div>
        <ExcelReader />
      </div>
    );
  }
}

export default App;
