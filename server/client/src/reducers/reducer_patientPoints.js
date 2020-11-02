import { FETCH_PATIENT_POINTS } from '../actions/index';

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = [], action) {
  switch (action.type) {
    case FETCH_PATIENT_POINTS:
      return action.payload.data;
    default:
      return state;
  }
}