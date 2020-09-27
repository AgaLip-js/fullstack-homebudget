import { GET_SUM_ACCOUNTS, GET_SUM_EXPENSES } from "../actions";
const initialState = {
  sumAccounts: null,
  sumExpenses: null,
};
const aggregateReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_SUM_ACCOUNTS:
      return {
        ...state,
        sumAccounts: action.payload.sumAccounts,
      };
    case GET_SUM_EXPENSES:
      return {
        ...state,
        sumExpenses: action.payload.sumExpenses,
      };
    default:
      return state;
  }
};

export default aggregateReducer;
