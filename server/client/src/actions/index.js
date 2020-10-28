import axios from 'axios';

export const FETCH_PATIENT_POINTS = 'FETCH_PATIENT_POINTS ';
export const FETCH_OPTIMIZED_ROUTE = 'FETCH_OPTIMIZED_ROUTE';

const mapboxToken =
  "pk.eyJ1IjoiYWxmaWVmZWxkc3BhciIsImEiOiJja2dyOHBteHIwOHdoMnFzMGZ0dzhrdWx0In0.seq5jj6Q5Hhw2Fb-ecBskg";
const ROOT_URL = 'http://localhost:5000/api';
let request = '';

export function fetchPatientPoints(rn_Id) {
  request = axios.get(`${ROOT_URL}/patients/${rn_Id}`); //a promise
  return {
    type: FETCH_PATIENT_POINTS, //the action name"
    payload: request, //api call
  };
}

export function fetchOptimizedRoute(coords) {
  console.log("In actions to fetch route")
  request = axios.get(`https://api.mapbox.com/optimized-trips/v1/mapbox/driving/${coords}?source=first&destination=last&roundtrip=false&access_token=${mapboxToken}`);
  return {
    type: FETCH_OPTIMIZED_ROUTE,
    payload: request,
  };
}

