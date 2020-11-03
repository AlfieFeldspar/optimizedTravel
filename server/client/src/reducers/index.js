import { combineReducers } from "redux";
import PatientPointsReducer from "./reducer_patientPoints";
import OptimizedRouteReducerLeg1 from "./reducer_optimized_route_leg1";
import OptimizedRouteReducerLeg2 from "./reducer_optimized_route_leg2"; 
import ChangePatientPriorityReducer from "./reducer_change_pt_priority"; 
import FetchAllNursesReducer from "./reducer_fetch_nurses";
import FetchNurseById from "./reducer_fetch_nurse_by_id";
import SendNurseCoords from "./reducer_nurse_coords";
import ChangeVisitOrder from "./reducer_visit_order";
import ClearedPatientData from "./reducer_clear_patient_data"

const rootReducer = combineReducers({
  patientData: PatientPointsReducer,
  routeLeg1: OptimizedRouteReducerLeg1,
  routeLeg2: OptimizedRouteReducerLeg2,
  changedPtPriority: ChangePatientPriorityReducer,
  allNurses: FetchAllNursesReducer,
  oneNurseById: FetchNurseById,
  nurseCoords: SendNurseCoords,
  changedVisitOrder: ChangeVisitOrder,
  clearedPatientData: ClearedPatientData,
});

export default rootReducer;