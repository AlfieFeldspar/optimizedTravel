import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchPatientPoints } from "../actions/index";

let ptData = [];

class PatientList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ptPointData: [],
      
    };
  }

  async componentDidMount() {
    const response = this.props.fetchPatientPoints(1);
    const json = await response;
    console.log("fetched data ", json.payload.data);
    ptData = json.payload.data.map((item) => {
      const container = {};
      container.ptId = item.pt_Id;
      container.ptName = [item.ptFirstName, item.ptLastName].join(" ");
      container.nursingNeed = item.nursingNeed;
      container.visitPriority = item.visitPriority;
      container.Lng = item.ptHomeLng;
      container.Lat = item.ptHomeLat;
      return container;
    });
    this.setState({ ptPointData: ptData }, function () {});
    return ptData;
  }

  handlePriorityChange = (event) => {
    console.log("clicked!" ,event.target.value)
    console.log("ref data in event handler", this.state.ptPointData)
    this.setState({
      ptPointData.visitPriority: event.target.value,
    }, function () {
      console.log ("state after event", this.state.ptPointData)
    });
  }

  render() {
    return (
      <table className="patient-table table-striped">
        <thead>
          <tr> 
            <th scope="col">Name</th>
            <th scope="col">Nursing Need</th>
            <th scope="col">Priority</th>
          </tr>
        </thead>
        <tbody>
          {ptData.map((patient) => (
            <tr className="row-sm-3 patient-row" key={patient._id}>
              <th scope="col" className="patient-name">
                {patient.ptName}
              </th>
              <th scope="col" className="visit-reason">
                {patient.nursingNeed}
              </th>
              <th scope="col" className="visit-priority">

                   <div className="form-check" ref='radio-form'>
                         <input className="form-check-input" type="radio" value="0" 
                          checked={patient.visitPriority === 0} onChange={this.handlePriorityChange}></input>
                         <label>0</label>        
                       </div>
                       <div className="form-check">
                         <input className="form-check-input" type="radio" value="1" checked={patient.visitPriority === 1} onChange={this.handlePriorityChange}></input>
                         <label>1</label>        
                       </div>

               
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
    ptPointData: state.ptPointData,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchPatientPoints }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PatientList);
