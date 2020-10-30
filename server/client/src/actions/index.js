import axios from "axios";

export const FETCH_PATIENT_POINTS = "FETCH_PATIENT_POINTS ";
export const FETCH_OPTIMIZED_ROUTE_LEG1 = "FETCH_OPTIMIZED_ROUTE_LEG1";
export const FETCH_OPTIMIZED_ROUTE_LEG2 = "FETCH_OPTIMIZED_ROUTE_LEG2";
export const CHANGE_PATIENT_PRIORITY = "CHANGE_PATIENT_PRIORITY";

const mapboxToken =
  "pk.eyJ1IjoiYWxmaWVmZWxkc3BhciIsImEiOiJja2dyOHBteHIwOHdoMnFzMGZ0dzhrdWx0In0.seq5jj6Q5Hhw2Fb-ecBskg";
const ROOT_URL = "http://localhost:5000/api";

export function fetchPatientPoints(rn_Id) {
  const request = axios.get(`${ROOT_URL}/patients/${rn_Id}`); //a promise
  return {
    type: FETCH_PATIENT_POINTS, //the action name"
    payload: request, //api call
  };
}
// function inputs [-27.2345,-7.2345], [[27.2345,-27.2345],[27.2345,-27.2345]], [27.2345,-27.2345]
// Needed: lng,lat;lng,lat 
export function fetchOptimizedRouteLeg1(start, middle, end) {
  console.log("In actions to fetch route1");
  const inputCoordSequence = [start];
  inputCoordSequence.push(...middle);
  inputCoordSequence.push(end);
  // current condition [[-27.2345,-7.2345], [27.2345,-27.2345],[27.2345,-27.2345], [27.2345,-27.2345]]
  const coords = stringifyCoordSequence(inputCoordSequence)

  const request = axios.get(
    `https://api.mapbox.com/optimized-trips/v1/mapbox/driving/${coords}?source=first&destination=last&roundtrip=false&geometries=geojson&access_token=${mapboxToken}`)
  return {
    type: FETCH_OPTIMIZED_ROUTE_LEG1,
    payload: request,
  };
}

export function fetchOptimizedRouteLeg2(start, middle, end) {
  console.log("In actions to fetch route2");
  const inputCoordSequence = [start];
  console.log("middle coords", middle)
  inputCoordSequence.push(...middle);
  inputCoordSequence.push(end);
  // current condition [[-27.2345,-7.2345], [27.2345,-27.2345],[27.2345,-27.2345], [27.2345,-27.2345]]
  const coords = stringifyCoordSequence(inputCoordSequence)
  console.log("coords Leg2", coords)
  const request = axios.get(
    `https://api.mapbox.com/optimized-trips/v1/mapbox/driving/${coords}?source=first&destination=last&roundtrip=false&geometries=geojson&access_token=${mapboxToken}`)
  return {
    type: FETCH_OPTIMIZED_ROUTE_LEG2,
    payload: request,
  };
}


function stringifyCoordPair (onePair) {
  return onePair.join(',');
}

function stringifyCoordSequence(nestedArrayofCoordPairs) {
  return nestedArrayofCoordPairs.map(element => {
    return stringifyCoordPair(element)
  }).join(';');  
}

export function changePatientPriority(patientId) {
  console.log("getting ready to change priority!")
}
