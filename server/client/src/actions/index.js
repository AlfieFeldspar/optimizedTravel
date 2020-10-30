import axios from "axios";

export const FETCH_PATIENT_POINTS = "FETCH_PATIENT_POINTS ";
export const FETCH_OPTIMIZED_ROUTE_LEG1 = "FETCH_OPTIMIZED_ROUTE_LEG1";
export const FETCH_OPTIMIZED_ROUTE_LEG2 = "FETCH_OPTIMIZED_ROUTE_LEG2";

const mapboxToken =
  "pk.eyJ1IjoiYWxmaWVmZWxkc3BhciIsImEiOiJja2dyOHBteHIwOHdoMnFzMGZ0dzhrdWx0In0.seq5jj6Q5Hhw2Fb-ecBskg";
const ROOT_URL = "http://localhost:5000/api";
let request = "";

export function transformRouteToGeoJson(response) {
  const start = {
    type: "Feature",
    properties: { key: "value" },
    geometry: null,
  };
  start.geometry = response.trips[0].geometry;
  return start;
}

export function fetchPatientPoints(rn_Id) {
  request = axios.get(`${ROOT_URL}/patients/${rn_Id}`); //a promise
  return {
    type: FETCH_PATIENT_POINTS, //the action name"
    payload: request, //api call
  };
}

export async function fetchOptimizedRouteLeg1(coords) {
  console.log("In actions to fetch route1");
  request = axios.get(
    `https://api.mapbox.com/optimized-trips/v1/mapbox/driving/${coords}?source=first&destination=last&roundtrip=false&geometries=geojson&access_token=${mapboxToken}`).then(response => {
    const transformedResponse = transformRouteToGeoJson(response.data);
    return transformedResponse;
  });
  return {
    type: FETCH_OPTIMIZED_ROUTE_LEG1,
    payload: request,
  };
}

export async function fetchOptimizedRouteLeg2(coords) {
  console.log("In actions to fetch route2");
  request = axios.get(
    `https://api.mapbox.com/optimized-trips/v1/mapbox/driving/${coords}?source=first&destination=last&roundtrip=false&geometries=geojson&access_token=${mapboxToken}`
  );
  return {
    type: FETCH_OPTIMIZED_ROUTE_LEG2,
    payload: request,
  };
}

// getCoordinates = async () => {
//   const endpoint = `https://api.mapbox.com/directions/v5/mapbox/cycling/${
//     this.props.userLong
//   },${this.props.userLat};${this.props.restaurantLong},${
//     this.props.restaurantLat
//   }?geometries=geojson&access_token=pk.eyJ1IjoicmhlYXJhbyIsImEiOiJjanY3NGloZm4wYzR5NGVxcGU4MXhwaTJtIn0.d_-A1vz2gnk_h1GbTchULA`;
//   const res = await axios.get(endpoint);
//   data[0].path = res.data.routes[0].geometry.coordinates;
//   this.setState({
//     loadedData: true
//   });
// };
