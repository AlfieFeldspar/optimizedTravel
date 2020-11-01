import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Map from "../components/Map";
import PatientList from "../components/PatientList";
import {fetchPatientPoints} from '../actions';

class App extends Component {
  componentDidMount() {
    this.props.fetchPatientPoints(1);
  }
  render() {
    return (
      <div>
        <Map />
        <PatientList />
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchPatientPoints } , dispatch);
}

export default connect(null, mapDispatchToProps)(App);
