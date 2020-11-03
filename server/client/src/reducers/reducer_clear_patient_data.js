import { CLEAR_PATIENT_DATA } from '../actions/index';

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = [], action) {
  switch (action.type) {
    case CLEAR_PATIENT_DATA:
      return action.payload.data;
    default:
      return state;
  }
}