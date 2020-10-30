import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
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
        <PatientList pt_Id='ownProps.ptData.pt_ID'/>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchPatientPoints } , dispatch);
}

export default connect(null, mapDispatchToProps)(App);
