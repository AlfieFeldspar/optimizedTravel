import { combineReducers } from "redux";
import PatientPointsReducer from "./reducer_patientPoints";
import OptimizedRouteReducerLeg1 from "./reducer_optimized_route_leg1";
import OptimizedRouteReducerLeg2 from "./reducer_optimized_route_leg2"; 
import ChangePatientPriorityReducer from "./reducer_change_pt_priority"; 
import FetchAllNursesReducer from "./reducer_fetch_nurses"

console.log("in root reducer")

const rootReducer = combineReducers({
  patientData: PatientPointsReducer,
  routeLeg1: OptimizedRouteReducerLeg1,
  routeLeg2: OptimizedRouteReducerLeg2,
  changedPtPriority: ChangePatientPriorityReducer,
  allNurses: FetchAllNursesReducer,
});

export default rootReducer;