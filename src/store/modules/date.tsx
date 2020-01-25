//types
const SELECT = "date/SELECT";

interface SelectDataParams {
  currentDay: number;
  currentWeek: number;
  currentMonth: number;
  currentYear: number;
}

interface Select {
  type: typeof SELECT;
  payload: SelectDataParams;
}

export type DateActionType = Select;

//actions

function Select(
  currentDay: number,
  currentWeek: number,
  currentMonth: number,
  currentYear: number
) {
  return {
    type: SELECT,
    payload: {
      currentDay: currentDay,
      currentWeek: currentWeek,
      currentMonth: currentMonth,
      currentYear: currentYear
    }
  };
}

export const actionCreator = {
  Select
};

//initial state
export interface DateState {
  currentDay: number;
  currentWeek: number;
  currentMonth: number;
  currentYear: number;
}
let today: Date = new Date();
let currentDay: number = today.getDate();
let currentWeek: number = today.getDay();
let currentMonth: number = today.getMonth() + 1;
let currentYear: number = today.getFullYear();

const initialState: DateState = {
  currentDay: currentDay,
  currentWeek: currentWeek,
  currentMonth: currentMonth,
  currentYear: currentYear
};
//reducer

export function dateReducer(
  state = initialState,
  action: DateActionType
): DateState {
  switch (action.type) {
    case SELECT:
      return {
        currentDay: action.payload.currentDay,
        currentWeek: action.payload.currentWeek,
        currentMonth: action.payload.currentMonth,
        currentYear: action.payload.currentYear
      };
    default:
      return state;
  }
}
