import React, { Component } from "react";
import { connect } from "react-redux";
import Map from "../components/Map";
import PatientList from "../components/PatientList";

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

function mapStateToProps(state) {
  return {
    patientData: state.patientData,
    oneNurseById: state.oneNurseById,
  };
}

export default connect(mapStateToProps, null)(App);
