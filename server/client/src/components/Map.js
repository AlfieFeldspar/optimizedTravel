import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import ReactMapGL, { Marker } from "react-map-gl";
import {
  fetchOptimizedRouteLeg1,
  fetchOptimizedRouteLeg2,
  fetchPatientPoints,
} from "../actions";

// const lineFeature = {
//   type: "LineString",
//   path: [],
//   color: [255, 0, 0],
// };

const mapboxToken =
  "pk.eyJ1IjoiYWxmaWVmZWxkc3BhciIsImEiOiJja2dyOHBteHIwOHdoMnFzMGZ0dzhrdWx0In0.seq5jj6Q5Hhw2Fb-ecBskg";

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visitOrder: [],
      startingLocation: "",
      startingRNCoords_lat: 35.9285,
      startingRNCoords_lng: -78.9371,
      lineFeature: {},
      viewport: {
        latitude: 36.033376,
        longitude: -78.928621,
        zoom: 9,
        width: "100vw",
        height: "60vh",
        display: "block",
      },
    };
  }

  // componentDidMount() {
  //   setTimeout(() => {
  //     this.setState({
  //       startingRNCoords_lat: 35.9285,
  //       startingRNCoords_lng: -78.9371,
  //       startingLocation: "Home",
  //     });
  //     console.log(this.state.startingLocation);
  //   }, 1000);
  // }

  // Handler for the routing button.
  // TODO: Make this a component?
  btnClickHandler = () => {
    // ALL STEPS BELOW are to process coordinate pairs into a nested array

    // FOR LEG1: From RN to priority patient
    // Compile the RN starting coordinates into an array
    const startCoordsLeg1 = [
      this.state.startingRNCoords_lng,
      this.state.startingRNCoords_lat,
    ];
    const middleCoords = [];
    const endPatientLeg1 = this.props.patientData.find((patient) => {
      return patient.visitPriority === "High";
    });
    const endCoordsLeg1 = [endPatientLeg1.ptHomeLng, endPatientLeg1.ptHomeLat];
    // Send start (RN starting point), middle (empty), & end (priority patient) to API
    this.props.fetchOptimizedRouteLeg1(
      startCoordsLeg1,
      middleCoords,
      endCoordsLeg1
    );
    // FOR LEG2: Start at priority patient, optimize to middle patients, end at RN starting poing
    const startCoordsLeg2 = endCoordsLeg1;
    const endCoordsLeg2 = startCoordsLeg1;
    const middlePatients = [];
    this.props.patientData.forEach((patient) => {
      if (patient.visitPriority === "Low") {
        let ptCoordArray = [patient.ptHomeLng, patient.ptHomeLat];
        middlePatients.push(ptCoordArray);
      }
      return middlePatients;
    });
    this.props.fetchOptimizedRouteLeg2(
      startCoordsLeg2,
      middlePatients,
      endCoordsLeg2
    );

    let trip = [];
    // Ensure all props are back
    setTimeout(() => {
      console.log("leg2", this.props.routeLeg2);
      // console.log('patientlocation', this.props.patientData);
      this.props.routeLeg2.forEach(waypoint => {
        if (waypoint.waypoint_index === 0) {
          let tempArray = [waypoint.name];
          trip.push(tempArray);
        }
        return trip;
      })
      // console.log("trip", trip)
      this.props.routeLeg2.forEach(waypoint => {
        if (waypoint.waypoint_index === 1) {
          trip.push(waypoint.name);
        }
        return trip;
      })
      // console.log("trip", trip)
      this.props.routeLeg2.forEach(waypoint => {
        if (waypoint.waypoint_index === 2) {
          trip.push(waypoint.name);
        }
        return trip;
      })
      // console.log("trip", trip)
      this.props.routeLeg2.forEach(waypoint => {
        if (waypoint.waypoint_index === 3) {
          trip.push(waypoint.name);
        }
        return trip;
      })
      // console.log("trip", trip)
      this.props.routeLeg2.forEach(waypoint => {
        if (waypoint.waypoint_index === 4) {
          trip.push(waypoint.name);
        }
        return trip;
      })
      // console.log("trip", trip)
      this.props.routeLeg2.forEach(waypoint => {
        if (waypoint.waypoint_index === 5) {
          trip.push(waypoint.name);
        }
        return trip;
      })
      // console.log('finaltrip', trip)


      let patientVisitOrder = [];
      for (let i = 0; i < trip.length; i++) {
        this.props.patientData.forEach(patient => {
          if(patient.waypointName === trip[i]) {
            let tempArray = [patient.pt_Id, patient.waypointName]
            patientVisitOrder.push(tempArray)
          }
          return patientVisitOrder;
        })
      }
      console.log("trip", trip)
      console.log("patientVisitOrderlength", patientVisitOrder.length)


      for (let i = 0; i < patientVisitOrder.length; i++) {
        console.log("inloop", patientVisitOrder[i]);
        patientVisitOrder[i].push(i+1);
      };
      console.log("patientVisitOrderafterloop", patientVisitOrder)

      let nestedObjects=[];
      for (let i = 0; i< patientVisitOrder.length; i++) {
        let obj = {pt_Id: patientVisitOrder[i][0], waypointName: patientVisitOrder[i][1], visitOrder: patientVisitOrder[i][2]}
        nestedObjects.push(obj);
      }
      console.log("nestafter loop", nestedObjects)



    }, 200);
  }




  render() {
    return (
      <>
        <div>
          <div className="map-title">Traveling Nurse Route Planner</div>
          <button
            className="btn btn-primary btn-sm map-button"
            type="button"
            onClick={this.btnClickHandler}
          >
            Route
          </button>
        </div>
        <ReactMapGL
          {...this.state.viewport}
          onViewportChange={(viewport) => this.setState({ viewport })}
          id={"map"}
          ref={"map"}
          mapStyle="mapbox://styles/alfiefeldspar/ckgrbnv1m03yo19mae6w18rjn"
          mapboxApiAccessToken={mapboxToken}
        >
          {this.props.patientData.map((patient) =>
            getMarkerForPatient(patient)
          )}

      {/* Hardcoded home icon and lng/lat for RN */}
      <Marker
        latitude={this.state.startingRNCoords_lat}
        longitude={this.state.startingRNCoords_lng}
        offsetLeft={-12}
        offsetTop={-24}
      >
        <img src="https://img.icons8.com/material/24/000000/cottage--v1.png" alt="house" />
       </Marker>
        </ReactMapGL>
      </>
    );
  }

}

function getMarkerForPatient(patient) {
  if (patient.visitPriority === 1) {
    return (
      <Marker
        key={patient.pt_Id}
        latitude={patient.ptHomeLat}
        longitude={patient.ptHomeLng}
        offsetLeft={-12}
        offsetTop={-24}
      >
        <img
          src="https://img.icons8.com/color/18/000000/high-priority.png"
          alt="red"
        />
      </Marker>
    );
  } else if (patient.visitPriority === 2) {
    return (
      <Marker
        key={patient.pt_Id}
        latitude={patient.ptHomeLat}
        longitude={patient.ptHomeLng}
        offsetLeft={-12}
        offsetTop={-24}
      >
        <img
          src="https://img.icons8.com/color/22/000000/2-circle-c--v1.png"
          alt="two"
        />
      </Marker>
    );
  } else if (patient.visitPriority === 3) {
    return (
      <Marker
        key={patient.pt_Id}
        latitude={patient.ptHomeLat}
        longitude={patient.ptHomeLng}
        offsetLeft={-12}
        offsetTop={-24}
      >
        <img src="https://img.icons8.com/color/22/000000/3-circle-c--v1.png"
        alt="three"/>
      </Marker>
    );
  } else if (patient.visitPriority === 4) {
    return (
      <Marker
        key={patient.pt_Id}
        latitude={patient.ptHomeLat}
        longitude={patient.ptHomeLng}
        offsetLeft={-12}
        offsetTop={-24}
      >
        <img src="https://img.icons8.com/color/22/000000/4-circle-c--v1.png"
        alt="four"/>
      </Marker>
    );
  } else if (patient.visitPriority === 5) {
    return (
      <Marker
        key={patient.pt_Id}
        latitude={patient.ptHomeLat}
        longitude={patient.ptHomeLng}
        offsetLeft={-12}
        offsetTop={-24}
      >
        <img src="https://img.icons8.com/color/22/000000/5-circle-c--v2.png"
        alt="five"/>
      </Marker>
    );
  } else if (patient.visitPriority === 6) {
    return (
      <Marker
        key={patient.pt_Id}
        latitude={patient.ptHomeLat}
        longitude={patient.ptHomeLng}
        offsetLeft={-12}
        offsetTop={-24}
      >
        <img src="https://img.icons8.com/color/22/000000/6-circle-c--v1.png"
        alt="six"/>
      </Marker>
    );
  }
}

function mapStateToProps(state) {
  return {
    patientData: state.patientData,
    routeLeg1: state.routeLeg1,
    routeLeg2: state.routeLeg2,
    oneNurseById: state.oneNurseById,
    nurseCoords: state.nurseCoords,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    { fetchPatientPoints, fetchOptimizedRouteLeg1, fetchOptimizedRouteLeg2 },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Map);



// function getMarkerForNurse() {
//   if (this.state.startingLocation === "Home") {
//     return (
//       <Marker
//         latitude={this.state.startingRNCoords_lat}
//         longitude={this.state.startingRNCoords_lng}
//         offsetLeft={-12}
//         offsetTop={-24}
//       >
//         <img src="https://img.icons8.com/ios-glyphs/30/000000/city-buildings.png" />
//       </Marker>
//     );
//   } else {
//     return (
//       <Marker
//         latitude={this.state.startingRNCoords_lat}
//         longitude={this.state.startingRNCoords_lng}
//         offsetLeft={-12}
//         offsetTop={-24}
//       >
//{/* <img src="https://img.icons8.com/ios-glyphs/30/000000/city-buildings.png" alt="office"/> */}

//       </Marker>
//     );
