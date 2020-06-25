import { combineReducers } from "redux";
import processesName from "./processesName/reducers";
import processesDetail from "./processesDetail/reducers";

export default combineReducers({
  processesName: processesName,
  processesDetail: processesDetail,
});
