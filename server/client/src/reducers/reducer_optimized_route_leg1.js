import { FETCH_OPTIMIZED_ROUTE_LEG1 } from '../actions/index';

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = '', action) {
    console.log('in route reducer')
  switch (action.type) {
    case FETCH_OPTIMIZED_ROUTE_LEG1 :
      return action.payload.data;
    default:
      return state;
  }
}