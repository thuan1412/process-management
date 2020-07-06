import { combineReducers } from "redux";
import processesName from "./processesName/reducers";
import processesDetail from "./processesDetail/reducers";
import selectedProcess from "./selectedProcess/reducers";

export default combineReducers({
  processesName: processesName,
  processesDetail: processesDetail,
  selectedProcess: selectedProcess,
});
