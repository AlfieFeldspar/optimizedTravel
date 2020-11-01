import React, { Component } from "react";
import { connect } from "react-redux";
import { changePatientPriority, fetchPatientPoints } from "../actions/index";
import { bindActionCreators } from "redux";
import {Link} from 'react-router-dom'

class PatientList extends Component {

  handlePriorityChange = (event, pt_Id) => {
    let priority;
    console.log("clicked!", event.target.value);
    event.target.value === "Low" ? (priority = "High") : (priority = "Low");
    changePatientPriority(pt_Id, priority);
    setTimeout(() => {
      this.props.fetchPatientPoints(1);
    }, 100);
  };

 

  render() {
    return (
      <>
      <table className="patient-table table-striped">
        <thead>
          <tr className="table-headers">
            <th scope="col">Patient</th>
            <th scope="col">Nursing Need</th>
            <th scope="col">Priority</th>
          </tr>
        </thead>
        <tbody className="patient-table">
          {this.props.patientData.map((patient) => (
            <tr className="row-sm-3 patient-row" key={patient.pt_Id}>
              <th scope="col" className="patient-name">
                {patient.ptLastName}
              </th>
              <th scope="col" className="visit-reason">
                {patient.nursingNeed}
              </th>
              <th scope="col" className="visit-priority">
                <button
                  input
                  type="button"
                  value={patient.visitPriority}
                  className="btn btn-sm"
                  style={
                    patient.visitPriority === "High"
                      ? { color: "red" }
                      : { color: "black" }
                  }
                  onClick={(event) => {
                    this.handlePriorityChange(event, patient.pt_Id);
                  }}
                >
                  {patient.visitPriority}
                </button>
              </th>
            </tr>
          ))}
        </tbody>
      </table>
      <Link to='/' className='link-go-home'>
        Go Back
      </Link>
      </>
    );
  }
}

function mapStateToProps(state) {
  return {
    patientData: state.patientData,
    oneNurseById: state.oneNurseById,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ changePatientPriority, fetchPatientPoints }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PatientList);
