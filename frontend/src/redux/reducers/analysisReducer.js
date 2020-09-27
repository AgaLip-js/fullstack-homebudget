import {
  CLOSE_WARNINGMODAL,
  LOADING_ACCOUNTS,
  OPEN_WARNINGMODAL,
  LOADING_EXPENSES,
  EDIT_ACCOUNT,
  OPEN_MINIMODAL,
  REMOVE_ACCOUNT,
  SELECT_ACCOUNT,
  CLOSE_MINI_MODAL,
  ADD_ACCOUNT,
  ADD_EXPENSE,
} from "../actions";

const initialState = {
  accounts: [],
  open: false,
  account: "",
  select: false,
  expenses: [],
  title: "",
  openWM: false,
  isLoadingAcc: true,
  isLoadingExp: true,
};
const analysisReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOADING_ACCOUNTS:
      return {
        ...state,
        isLoadingAcc: false,
        accounts: action.payload.accounts,
      };
    case LOADING_EXPENSES:
      return {
        ...state,
        isLoadingExp: false,
        expenses: action.payload.expenses,
      };
    case OPEN_MINIMODAL: {
      return {
        ...state,
        open: action.payload.open,
        category: action.payload.category,
        title: action.payload.title,
      };
    }
    case OPEN_WARNINGMODAL: {
      return {
        ...state,
        openWM: action.payload.openWM,
      };
    }
    case CLOSE_WARNINGMODAL: {
      return {
        ...state,
        openWM: action.payload.openWM,
      };
    }
    case CLOSE_MINI_MODAL: {
      return {
        ...state,
        open: action.payload.open,
      };
    }
    case SELECT_ACCOUNT: {
      return {
        ...state,
        select: action.payload.select,
        account: action.payload.selectAccount,
      };
    }
    case ADD_ACCOUNT: {
      return {
        ...state,
        accounts: [...state.accounts, action.payload.newAccount],
      };
    }
    case ADD_EXPENSE: {
      return {
        ...state,
        expenses: [...state.expenses, action.payload.newExpense],
        accounts: state.accounts.map((account) => {
          if (account.id === action.payload.newExpense.idaccount) {
            return action.payload.newAccount;
          } else {
            return account;
          }
        }),
      };
    }
    case EDIT_ACCOUNT: {
      return {
        ...state,
        accounts: state.accounts.map((account) => {
          if (account.id === action.payload.newAccount.id)
            return action.payload.newAccount;

          return account;
        }),
      };
    }
    case REMOVE_ACCOUNT: {
      return {
        ...state,
        accounts: state.accounts.filter((acc) => {
          if (acc.id !== action.payload.id) {
            return acc;
          }
          return null;
        }),
        expenses: state.expenses.filter((exp) => {
          if (exp.idaccount !== action.payload.id) {
            return exp;
          }
          return null;
        }),
      };
    }

    default:
      return state;
  }
};

export default analysisReducer;
