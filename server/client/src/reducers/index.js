import { combineReducers } from "redux";
import PatientPointsReducer from "./reducer_patientPoints";
import OptimizedRouteReducer from "./reducer_optimized_route";
  
const rootReducer = combineReducers({
  data: PatientPointsReducer,
  routes: OptimizedRouteReducer
});

export default rootReducer;