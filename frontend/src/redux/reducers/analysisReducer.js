import { OPEN_MINIMODAL } from "../actions";
import { SELECT_ACCOUNT } from "../actions";
import { initialAccounts } from "../../templates/initialAccounts";
import { CLOSE_MINI_MODAL, ADD_ACCOUNT, ADD_EXPENSE } from "../actions";
import { initialExpenses } from "../../templates/initialExpenses";

const initialState = {
  accounts: initialAccounts,
  open: false,
  account: "",
  select: false,
  expenses: initialExpenses,
  title: "",
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

    default:
      return state;
  }
};

export default analysisReducer;
