import React, { Component } from "react";
import { connect } from "react-redux";
import {
  changePatientPriority,
  fetchPatientPoints,
  clearPatientData,
} from "../actions/index";
import { bindActionCreators } from "redux";
import { Link } from "react-router-dom";

class PatientList extends Component {
  // Handler for patient priority change low/high or high/low
  handlePriorityChange = (event, pt_Id) => {
    let priority;
    event.target.value === "Low" ? (priority = "High") : (priority = "Low");
    // Change the data on the backend
    this.props.changePatientPriority(pt_Id, priority);
    // Timeout to make sure data is updated, then fetch the updated patient data
    setTimeout(() => {
      this.props.fetchPatientPoints(this.props.oneNurseById[0].rn_Id);
    }, 100);
  };

  render() {
    return (
      <>
        <div className="patient-table">
          <table className=" table-striped table-body">
            <thead>
              <tr className="table-headers">
                <th scope="col">Patient</th>
                <th scope="col">Nursing Need</th>
                <th scope="col">Location</th>
                <th scope="col">Order</th>
                <th scope="col">Priority</th>
              </tr>
            </thead>

            <tbody>
              {this.props.patientData.map((patient) => (
                <tr className="row-sm-3 patient-row" key={patient.pt_Id}>
                  <th scope="col" className="patient-name">
                    {patient.ptLastName}
                  </th>
                  <th scope="col" className="visit-reason">
                    {patient.nursingNeed}
                  </th>
                  <th scope="col" className="visit-reason">
                    {patient.waypointName}
                  </th>
                  <th scope="col" className="visit-reason">
                    {patient.visitOrder}
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
        </div>
        <Link to="/" className="link-logout">
          Logout
        </Link>
      </>
    );
  }
}

function mapStateToProps(state) {
  return {
    patientData: state.patientData,
    oneNurseById: state.oneNurseById,
    clearedPatientData: state.clearedPatientData,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    { changePatientPriority, fetchPatientPoints, clearPatientData },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(PatientList);
