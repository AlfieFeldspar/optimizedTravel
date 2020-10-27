import { combineReducers } from "redux";
import PatientPointsReducer from "./reducer_patientPoints";
  
const rootReducer = combineReducers({
  products: PatientPointsReducer,
});

export default rootReducer;