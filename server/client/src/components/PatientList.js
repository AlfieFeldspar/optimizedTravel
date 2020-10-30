import React, { Component } from "react";
import { connect } from "react-redux";
import { changePatientPriority } from '../actions/index';
// import { bindActionCreators } from "redux";

class PatientList extends Component {
  handlePriorityChange = (event, Id) => {
    console.log("clicked!", event.target.value);
    console.log("Pt in event handler", Id);
    changePatientPriority(Id);
  };

  render() {
    return (
      <table className="patient-table table-striped">
        <thead>
          <tr className="table-headers">
            <th scope="col">Name</th>
            <th scope="col">Nursing Need</th>
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
              <th scope="col" className="visit-priority">
                <button
                  input
                  type="button"
                  value={patient.visitPriority}
                  className="btn priority-button"
                  onClick={(event) => {
                    this.handlePriorityChange(event, patient.pt_Id);
                  }}
                  style={
                    patient.visitPriority === "High"
                      ? { color: "red" }
                      : { color: "black" }
                  }
                >
                  {patient.visitPriority}
                </button>
              </th>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

function mapStateToProps(state) {
  return {
    patientData: state.patientData,
  };
}

// function mapDispatchToProps(dispatch) {
//   return bindActionCreators({ fetchPatientPoints }, dispatch);
// }

export default connect(mapStateToProps, null)(PatientList);

// <div className="form-check" ref="radio-form">
// <input
//   className="form-check-input"
//   type="radio"
//   value="0"
//   checked={patient.visitPriority === 0}
//   onChange={(event) => {
//     this.handlePriorityChange(event, patient.pt_Id);
//   }}
// ></input>
// <label>low</label>
// </div>
// <div className="form-check">
// <input
//   className="form-check-input"
//   type="radio"
//   value="1"
//   checked={patient.visitPriority === 1}
//   onChange={(event) => {
//     this.handlePriorityChange(event, patient.ptName);
//   }}
// ></input>
// <label>high</label>
// </div>
