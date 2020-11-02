import { SEND_NURSE_COORDS } from '../actions/index';

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = {}, action) {
  switch (action.type) {
    case SEND_NURSE_COORDS:
      return action.payload;
    default:
      return state;
  }
}