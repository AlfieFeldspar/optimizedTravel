import { FETCH_ALL_NURSES } from '../actions/index';

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = [], action) {
  switch (action.type) {
    case FETCH_ALL_NURSES:
      return action.payload.data;
    default:
      return state;
  }
}