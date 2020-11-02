import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { StaticMap, Marker } from "react-map-gl";
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

class Map extends Component {
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
      // Format as nested array [[lng,lat],[lng,lat]
      let fullTrip = [...this.props.routeLeg1.coordinates];
      let leg2 = [...this.props.routeLeg2.coordinates];
      leg2.forEach((pair) => {
        return fullTrip.push(pair);
      });
      lineFeature.path.push(fullTrip);
      console.log("fulltrip=PATH in lineFeature", fullTrip);
    }, 3000);
    this.setState({ lineFeature: lineFeature });
  };

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
        <StaticMap
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
              {/* 2-6 low priority numbers */}
              {/* <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
width="26" height="26"
viewBox="0 0 172 172"
style=" fill:#000000;"><g fill="none" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><path d="M0,172v-172h172v172z" fill="none"></path><g fill="#f1c40f"><path d="M86,13.23077c-40.10577,0 -72.76923,32.66346 -72.76923,72.76923c0,40.10577 32.66346,72.76923 72.76923,72.76923c40.10577,0 72.76923,-32.66346 72.76923,-72.76923c0,-40.10577 -32.66346,-72.76923 -72.76923,-72.76923zM86,26.46154c32.94772,0 59.53846,26.59074 59.53846,59.53846c0,32.94772 -26.59074,59.53846 -59.53846,59.53846c-32.94772,0 -59.53846,-26.59074 -59.53846,-59.53846c0,-32.94772 26.59074,-59.53846 59.53846,-59.53846zM86.62019,58.91827c-5.94351,0 -11.91286,1.24038 -16.53846,4.54808v11.37019c4.6256,-3.97956 9.22536,-5.99519 13.85096,-5.99519c9.25121,0 8.76022,8.55349 7.44231,10.54327c-7.28726,12.5589 -23.98077,13.98017 -23.98077,31.83654v3.92788h37.21154v-9.92308h-23.98077c0,-6.61538 23.98077,-12.53305 23.98077,-30.38942c0,-13.90264 -12.6881,-15.91827 -17.98558,-15.91827z"></path></g></g></svg> */}
              {/* <svg
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="30"
                height="30"
                viewBox="0 0 172 172"
                style=" fill:#000000;"
              >
                <g
                  fill="none"
                  fill-rule="nonzero"
                  stroke="none"
                  stroke-width="1"
                  stroke-linecap="butt"
                  stroke-linejoin="miter"
                  stroke-miterlimit="10"
                  stroke-dasharray=""
                  stroke-dashoffset="0"
                  font-family="none"
                  font-weight="none"
                  font-size="none"
                  text-anchor="none"
                  style="mix-blend-mode: normal"
                >
                  <path d="M0,172v-172h172v172z" fill="none"></path>
                  <g fill="#f1c40f">
                    <path d="M86,17.2c-37.9948,0 -68.8,30.8052 -68.8,68.8c0,37.9948 30.8052,68.8 68.8,68.8c37.9948,0 68.8,-30.8052 68.8,-68.8c0,-37.9948 -30.8052,-68.8 -68.8,-68.8zM85.7248,115.72733c-12.61907,0 -21.16173,-6.97747 -21.672,-17.63573h11.32907c0.35547,4.7816 4.39173,7.79733 10.46333,7.79733c5.9168,0 10.03333,-3.33107 10.03333,-8.1528c0,-4.9364 -3.88147,-7.998 -10.22827,-7.998h-7.0176v-8.81787h6.8972c5.37213,0 9.0128,-3.13613 9.0128,-7.76293c0,-4.54653 -3.526,-7.4476 -9.05293,-7.4476c-5.4868,0 -9.1332,3.096 -9.4428,7.998h-10.93347c0.38987,-10.6984 8.34773,-17.4408 20.6916,-17.4408c11.59853,0 19.94627,6.3468 19.94627,15.24493c0,6.54747 -4.11653,11.63867 -10.4232,12.9344v0.7052c7.76293,0.86 12.61907,6.0372 12.61907,13.4848c0,9.91867 -9.32813,17.09107 -22.2224,17.09107zM143.33333,86c0,31.6652 -25.66813,57.33333 -57.33333,57.33333c-31.6652,0 -57.33333,-25.66813 -57.33333,-57.33333c0,-31.6652 25.66813,-57.33333 57.33333,-57.33333c31.6652,0 57.33333,25.66813 57.33333,57.33333z"></path>
                  </g>
                </g>
              </svg> */}
              {/* <svg
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="30"
                height="30"
                viewBox="0 0 172 172"
                style=" fill:#000000;"
              >
                <g
                  fill="none"
                  fill-rule="nonzero"
                  stroke="none"
                  stroke-width="1"
                  stroke-linecap="butt"
                  stroke-linejoin="miter"
                  stroke-miterlimit="10"
                  stroke-dasharray=""
                  stroke-dashoffset="0"
                  font-family="none"
                  font-weight="none"
                  font-size="none"
                  text-anchor="none"
                  style="mix-blend-mode: normal"
                >
                  <path d="M0,172v-172h172v172z" fill="none"></path>
                  <g fill="#f1c40f">
                    <path d="M86,17.2c-37.9948,0 -68.8,30.8052 -68.8,68.8c0,37.9948 30.8052,68.8 68.8,68.8c37.9948,0 68.8,-30.8052 68.8,-68.8c0,-37.9948 -30.8052,-68.8 -68.8,-68.8zM86,28.66667c31.6652,0 57.33333,25.66813 57.33333,57.33333c0,31.6652 -25.66813,57.33333 -57.33333,57.33333c-31.6652,0 -57.33333,-25.66813 -57.33333,-57.33333c0,-31.6652 25.66813,-57.33333 57.33333,-57.33333zM82.32708,57.72526c-9.91293,14.9296 -17.2877,26.61073 -22.38464,36.21407v10.45885h27.67005v9.87657h11.2987v-9.87657h7.40183v-9.83177h-7.40183v-36.84115zM87.26536,66.92995h0.62708v27.9836h-17.32317v-0.62709c6.4672,-11.71893 11.52462,-19.63371 16.69609,-27.35651z"></path>
                  </g>
                </g>
              </svg> */}
              {/* <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
width="32" height="32"
viewBox="0 0 172 172"
style=" fill:#000000;"><g fill="none" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><path d="M0,172v-172h172v172z" fill="none"></path><g fill="#f1c40f"><path d="M86,21.5c-35.56738,0 -64.5,28.93262 -64.5,64.5c0,35.56739 28.93262,64.5 64.5,64.5c35.56739,0 64.5,-28.93261 64.5,-64.5c0,-35.56738 -28.93261,-64.5 -64.5,-64.5zM86,32.25c29.75146,0 53.75,23.99854 53.75,53.75c0,29.75146 -23.99854,53.75 -53.75,53.75c-29.75146,0 -53.75,-23.99854 -53.75,-53.75c0,-29.75146 23.99854,-53.75 53.75,-53.75zM70.71484,59.125l-0.83984,4.53516l-2.6875,16.125l-1.00781,6.21484h22.50781c4.70313,0 8.0625,3.35938 8.0625,8.0625c0,4.70313 -3.35937,8.0625 -8.0625,8.0625h-5.375c-4.70312,0 -8.0625,-3.35937 -8.0625,-8.0625h-10.75c0,10.33008 8.48242,18.8125 18.8125,18.8125h5.375c10.33008,0 18.8125,-8.48242 18.8125,-18.8125c0,-10.33008 -8.48242,-18.8125 -18.8125,-18.8125h-9.74219l1.00781,-5.375h22.17188v-10.75z"></path></g></g></svg> */}
              {/* <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
width="30" height="30"
viewBox="0 0 172 172"
style=" fill:#000000;"><g fill="none" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><path d="M0,172v-172h172v172z" fill="none"></path><g fill="#f1c40f"><path d="M86,17.2c-37.9948,0 -68.8,30.8052 -68.8,68.8c0,37.9948 30.8052,68.8 68.8,68.8c37.9948,0 68.8,-30.8052 68.8,-68.8c0,-37.9948 -30.8052,-68.8 -68.8,-68.8zM86,28.66667c31.6652,0 57.33333,25.66813 57.33333,57.33333c0,31.6652 -25.66813,57.33333 -57.33333,57.33333c-31.6652,0 -57.33333,-25.66813 -57.33333,-57.33333c0,-31.6652 25.66813,-57.33333 57.33333,-57.33333zM87.09739,56.29193c-14.73467,0 -23.59401,11.36813 -23.59401,30.14479c0,7.76293 1.61178,14.25952 4.74792,19.08125c3.88147,6.622 10.46279,10.23489 18.65573,10.23489c12.6592,0 21.63438,-8.35239 21.63438,-20.11146c0,-10.81307 -7.8836,-18.76771 -18.62214,-18.76771c-6.58187,0 -11.83145,3.01045 -14.42292,8.34245h-0.70547c-0.23507,-11.71893 4.46519,-19.20442 12.22812,-19.20442c4.42613,0 7.96405,2.3538 9.05911,6.08047h11.71302c-1.60533,-9.4428 -9.95522,-15.80026 -20.69375,-15.80026zM86.82864,86c5.9168,0 10.2237,4.22654 10.2237,9.98854c0,5.68747 -4.46635,10.04453 -10.26849,10.04453c-5.80213,0 -10.2237,-4.39451 -10.2237,-10.15651c0,-5.6416 4.35169,-9.87656 10.26849,-9.87656z"></path></g></g></svg> */}
              {/* #1: high priority */}
              {/* <svg
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="24"
                height="24"
                viewBox="0 0 172 172"
                style=" fill:#000000;"
              >
                <g
                  fill="none"
                  fillRule="nonzero"
                  stroke="none"
                  strokeWidth="1"
                  strokeLinecap="butt"
                  strokeLinejoin="miter"
                  strokeMiterlimit="10"
                  strokeDasharray=""
                  strokeDashoffset="0"
                  fontFamily="none"
                  fontWeight="none"
                  fontSize="none"
                  textAnchor="none"
                  style="mix-blend-mode: normal"
                > */}
                  {/* <path d="M0,172v-172h172v172z" fill="none"></path>
                  <g fill="#e74c3c">
                    <path d="M86,14.33333c-39.41667,0 -71.66667,32.25 -71.66667,71.66667c0,39.41667 32.25,71.66667 71.66667,71.66667c39.41667,0 71.66667,-32.25 71.66667,-71.66667c0,-39.41667 -32.25,-71.66667 -71.66667,-71.66667zM95.31667,118.96667h-12.9v-50.88333l-15.76667,5.01667v-10.75l27.23333,-10.03333h1.43333zM143.33333,86c0,31.66233 -25.671,57.33333 -57.33333,57.33333c-31.66233,0 -57.33333,-25.671 -57.33333,-57.33333c0,-31.66233 25.671,-57.33333 57.33333,-57.33333c31.66233,0 57.33333,25.671 57.33333,57.33333z"></path>
                  </g>
                </g>
              </svg> */}
            </Marker>
          ))}
          <Marker
            latitude={this.state.startingRNCoords.lat}
            longitude={this.state.startingRNCoords.lng}
            offsetLeft={-12}
            offsetTop={-24}
          >
            {/* if Office */}
            {/* <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-building" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
  <path fill-rule="evenodd" d="M14.763.075A.5.5 0 0 1 15 .5v15a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5V14h-1v1.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V10a.5.5 0 0 1 .342-.474L6 7.64V4.5a.5.5 0 0 1 .276-.447l8-4a.5.5 0 0 1 .487.022zM6 8.694L1 10.36V15h5V8.694zM7 15h2v-1.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5V15h2V1.309l-7 3.5V15z"/>
  <path d="M2 11h1v1H2v-1zm2 0h1v1H4v-1zm-2 2h1v1H2v-1zm2 0h1v1H4v-1zm4-4h1v1H8V9zm2 0h1v1h-1V9zm-2 2h1v1H8v-1zm2 0h1v1h-1v-1zm2-2h1v1h-1V9zm0 2h1v1h-1v-1zM8 7h1v1H8V7zm2 0h1v1h-1V7zm2 0h1v1h-1V7zM8 5h1v1H8V5zm2 0h1v1h-1V5zm2 0h1v1h-1V5zm0-2h1v1h-1V3z"/>
            </svg> */}
          {/*  if Home */}
          <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-house-door-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
  <path d="M6.5 10.995V14.5a.5.5 0 0 1-.5.5H2a.5.5 0 0 1-.5-.5v-7a.5.5 0 0 1 .146-.354l6-6a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 .146.354v7a.5.5 0 0 1-.5.5h-4a.5.5 0 0 1-.5-.5V11c0-.25-.25-.5-.5-.5H7c-.25 0-.5.25-.5.495z"/>
  <path fill-rule="evenodd" d="M13 2.5V6l-2-2V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5z"/>
</svg>
          </Marker>
        </StaticMap>
        <DeckGL
          {...this.state.viewport}
          onViewportChange={(viewport) => this.setState({ viewport })}
          layers={[
            new PathLayer({
              views: undefined,
              controller: true,
              id: "path-layer",
              data: this.state.lineFeature ? this.state.lineFeature : [],
              strokeWidth: 3,
              getPath: (d) => d.path,
            }),
          ]}
        ></DeckGL>
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
