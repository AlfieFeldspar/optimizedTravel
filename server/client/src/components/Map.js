import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import ReactMapGL, { Source, Layer, Marker } from "react-map-gl";
import DeckGL from "@deck.gl/react";
import { PathLayer } from "@deck.gl/layers";
// import {GeoJsonLayer} from '@deck.gl/layers';

import {
  fetchOptimizedRouteLeg1,
  fetchOptimizedRouteLeg2,
  fetchPatientPoints,
} from "../actions";

const lineFeature = {
  type: "LineString",
  path: [],
  color: [255, 0, 0],
};

const mapboxToken =
  "pk.eyJ1IjoiYWxmaWVmZWxkc3BhciIsImEiOiJja2dyOHBteHIwOHdoMnFzMGZ0dzhrdWx0In0.seq5jj6Q5Hhw2Fb-ecBskg";

class Map extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      startingRNCoords: {
        lat: 35.9285,
        lng: -78.9371,
      },
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

  // Handler for the routing button. It does too much!
  // TODO: Make this a component?
  btnClickHandler = () => {
    // ALL STEPS BELOW are to process coordinate pairs into a nested array

    // FOR LEG1: From RN to priority patient
    // Compile the RN starting coordinates into an array
    const startCoordsLeg1 = [
      this.state.startingRNCoords.lng,
      this.state.startingRNCoords.lat,
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
    // Ensure all props are back
    setTimeout(() => {
      // Merge all coords into one trip
      // Format as nested array [[lng,lat],[lng,lat]]
      
      console.log("let1coords" ,this.props.routeLeg1.coordinates)
      console.log("let2coords" ,this.props.routeLeg2.coordinates)

      let fullTrip = [...this.props.routeLeg1.coordinates];
      let leg2 = [...this.props.routeLeg2.coordinates];
      leg2.forEach((pair) => {
        return fullTrip.push(pair);
      });
      lineFeature.path.push(fullTrip);
    }, 3000);
    console.log('linefeature', lineFeature)
    this.setState({lineFeature: lineFeature})
    return lineFeature;
  };

  render() {
    console.log("in render linefeature", lineFeature);
    return (
      <>
        <div>
          <div className="map-title">Traveling Nurse Route Planner</div>
          <button
            className="btn btn-primary btn-sm map-button"
            type="button"
            onClick={this.btnClickHandler}
          >Route</button>
        </div>
        <ReactMapGL
          {...this.state.viewport}
          onViewportChange={(viewport) => this.setState({ viewport })}
          id={"map"}
          ref={"map"}
          mapStyle="mapbox://styles/alfiefeldspar/ckgrbnv1m03yo19mae6w18rjn"
          mapboxApiAccessToken={mapboxToken}
        >
          {this.props.patientData.map((patient) => (
            <Marker
              key={patient.pt_id}
              latitude={patient.ptHomeLat}
              longitude={patient.ptHomeLng}
              offsetLeft={-12}
              offsetTop={-24}
            >
              <svg
                className="marker"
                style={{
                  width: "24px",
                  height: "24px",
                }}
                viewBox="0 0 24 24"
                strokeWidth="3"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
            </Marker>
          ))}
          <Marker
            latitude={this.state.startingRNCoords.lat}
            longitude={this.state.startingRNCoords.lng}
            offsetLeft={-12}
            offsetTop={-24}
          >
            <svg
              className="feather feather-truck"
              style={{
                width: "24",
                height: "24",
              }}
              viewBox="0 0 24 24"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              stroke="#ff6600"
              strokeWidth="3"
            >
              <rect x="1" y="3" width="15" height="13"></rect>
              <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>
              <circle cx="5.5" cy="18.5" r="2.5"></circle>
              <circle cx="18.5" cy="18.5" r="2.5"></circle>
            </svg>
          </Marker>
          <DeckGL
            {...this.state.viewport}
            layers={[
              new PathLayer({
                id: "path-layer",
                data: this.state.lineFeature ? this.state.lineFeature : null,
                strokeWidth: 3,
                getPath: (d) => d.path,
              }),
            ]}
          />
          ;
        </ReactMapGL>
      </>
    );
  }
}

function mapStateToProps(state) {
  return {
    patientData: state.patientData,
    routeLeg1: state.routeLeg1,
    routeLeg2: state.routeLeg2,
    oneNurseById: state.oneNurseById,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    { fetchPatientPoints, fetchOptimizedRouteLeg1, fetchOptimizedRouteLeg2 },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Map);
