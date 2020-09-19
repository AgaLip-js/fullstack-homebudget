import { EDIT_ACCOUNT, OPEN_MINIMODAL, REMOVE_ACCOUNT } from "../actions";
import { SELECT_ACCOUNT } from "../actions";
import { initialAccounts } from "../../templates/initialAccounts";
import { CLOSE_MINI_MODAL, ADD_ACCOUNT, ADD_EXPENSE } from "../actions";
import { initialExpenses } from "../../templates/initialExpenses";
import {
  CLOSE_WARNINGMODAL,
  OPEN_WARNINGMODAL,
} from "../actions/analysisActions";

const initialState = {
  accounts: initialAccounts,
  open: false,
  account: "",
  select: false,
  expenses: initialExpenses,
  title: "",
  openWM: false,
};
const analysisReducer = (state = initialState, action) => {
  switch (action.type) {
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
          if (account.id === action.payload.newExpense.idAccount) {
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
          if (acc.id !== action.payload.removeAccount.id) {
            return acc;
          }
        }),
      };
    }

    default:
      return state;
  }
};

export default analysisReducer;
