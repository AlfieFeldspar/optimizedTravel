import axios from 'axios';

export const FETCH_PATIENT_POINTS = 'FETCH_PATIENT_POINTS ';

const ROOT_URL = 'http://localhost:5000/api';
let request = '';

export function fetchPatientPoints(rn_Id) {
  request = axios.get(`${ROOT_URL}/patients/${rn_Id}`); //a promise
  console.log('Fetch pts request', request);
  return {
    type: FETCH_PATIENT_POINTS, //the action name"
    payload: request, //api call
  };
}