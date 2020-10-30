import { CHANGE_PATIENT_PRIORITY } from '../actions/index';

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = [], action) {
  switch (action.type) {
    case CHANGE_PATIENT_PRIORITY:
      return action.payload.data;
    default:
      return state;
  }
}