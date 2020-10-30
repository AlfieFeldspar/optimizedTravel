import { combineReducers } from "redux";
import PatientPointsReducer from "./reducer_patientPoints";
import OptimizedRouteReducerLeg1 from "./reducer_optimized_route_leg1";
import OptimizedRouteReducerLeg2 from "./reducer_optimized_route_leg2";  

const rootReducer = combineReducers({
  patientData: PatientPointsReducer,
  routeLeg1: OptimizedRouteReducerLeg1,
  routeLeg2: OptimizedRouteReducerLeg2
});

export default rootReducer;