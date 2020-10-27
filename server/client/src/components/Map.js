import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import ReactMapGL from "react-map-gl";

import { fetchPatientPoints } from "../actions";

const mapboxToken =
  "pk.eyJ1IjoiYWxmaWVmZWxkc3BhciIsImEiOiJja2dyOHBteHIwOHdoMnFzMGZ0dzhrdWx0In0.seq5jj6Q5Hhw2Fb-ecBskg";

// class Markers extends Component {
//       render() {
//         const {data} = this.state;
//         return data.map(
//           entry =>
//               <Marker
//               key={entry.ptLastName}
//               longitude={entry.ptHomeLng} latitude={entry.ptHomeLat}
//               >
//                 <img src="pin.png" />
//               </Marker>
//           )
//         }
//       }

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      viewport: {
        latitude: 35.908141,
        longitude: -78.905461,
        zoom: 10,
        width: "100vw",
        height: "100vh",
        display: "block",
      },
    };
    this.extractPtPoints = this.extractPtPoints.bind(this);
  }

  async componentDidMount() {
    const response = this.props.fetchPatientPoints(1);
    const json = await response;
    this.setState({ data: json.payload.data }, function () {
    });
    this.extractPtPoints();
  }

  extractPtPoints() {
    const ptData = this.state.data;
    console.log("ptdata ", ptData);
    const ptCoords = ptData.map(item => {
        const container = {};
        container.ptName = [item.ptFirstName,item.ptLastName].join(" ");
        container.nursingNeed = item.nursingNeed;
        container.visitPriority = item.visitPriority;
        container.Lng = item.ptHomeLng;
        container.Lat = item.ptHomeLat;
        return container;
        });
    console.log("ptcoord", ptCoords);
    }
  

  render() {
    return (
      <ReactMapGL
        {...this.state.viewport}
        onViewportChange={(viewport) => this.setState({ viewport })}
        mapStyle="mapbox://styles/alfiefeldspar/ckgrbnv1m03yo19mae6w18rjn"
        mapboxApiAccessToken={mapboxToken}
      ></ReactMapGL>
    );
  }
}

// {/* const CITIES = [...];

// // PureComponent ensures that the markers are only rerendered when data changes
// class Markers extends PureComponent {
//   render() {
//     const {data} = this.props;
//     return data.map(
//       city => <Marker key={city.name} longitude={city.longitude} latitude={city.latitude} ><img src="pin.png" /></Marker>
//       )
//     }
//   } */}

// {/* class Map extends PureComponent {
//   state = {
//     viewport: {
//       latitude: 37.78,
//       longitude: -122.41,
//       zoom: 8
//     }
//   };

//   render() {
//     return (
//       <ReactMapGL {...this.state.viewport} onViewportChange={viewport => this.setState({viewport})}>
//       <Markers data={CITIES} />
//       </ReactMapGL>
//       );
//     }
//     //  onViewportChange={nextViewport => setViewport(nextViewport)}
// } */}
function mapStateToProps(state) {}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchPatientPoints }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Map);
