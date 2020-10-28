import React, { Component } from "react";
import Map from '../components/Map';
import PatientList from '../components/PatientList';


class App extends Component {
  render() {
    return (
      <div>
        <Map />
        <PatientList />
      </div>
    );
  }
}

export default App;
