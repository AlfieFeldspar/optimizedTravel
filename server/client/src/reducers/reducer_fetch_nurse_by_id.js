import { FETCH_NURSE_BY_ID } from '../actions/index';

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = {}, action) {
  switch (action.type) {
    case FETCH_NURSE_BY_ID:
      return action.payload.data;
    default:
      return state;
  }
}