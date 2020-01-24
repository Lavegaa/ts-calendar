import { combineReducers } from "redux";
import * as modules from "./modules";
import { DateState, dateReducer as date } from "./modules/date";

export interface StoreState {
  date: DateState;
}

const rootReducer = combineReducers<StoreState>({
  date
});

export default rootReducer;
