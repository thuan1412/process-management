import { combineReducers } from "redux";
import processes from "./processes/reducers";
import processesDetail from "./processesDetail/reducers";
import selectedProcess from "./selectedProcess/reducers";

export default combineReducers({
  processes: processes,
  processesDetail: processesDetail,
  selectedProcess: selectedProcess,
});
