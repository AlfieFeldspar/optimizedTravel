import { FETCH_OPTIMIZED_ROUTE_LEG2 } from '../actions/index';

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = '', action) {
  switch (action.type) {
    case FETCH_OPTIMIZED_ROUTE_LEG2 :
      console.log("payload.data.trips for route Leg2", action.payload.data.waypoints)
      return action.payload.data.waypoints;
    default:
      return state;
  }
}