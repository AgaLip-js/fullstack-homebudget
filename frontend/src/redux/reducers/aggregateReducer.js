import {
  GET_SUM_ACCOUNTS,
  GET_SUM_EXPENSES,
  GET_SUM_GROUP_CATEGORY,
} from "../actions";
const initialState = {
  sumAccounts: [],
  sumExpenses: [],
  sumExpGroupCategory: [],
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
    case GET_SUM_GROUP_CATEGORY:
      return {
        ...state,
        sumExpGroupCategory: action.payload.sumExpGroupCategory,
      };

    default:
      return state;
  }
};

export default aggregateReducer;
