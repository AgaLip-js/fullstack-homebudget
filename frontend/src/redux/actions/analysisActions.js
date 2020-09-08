export const OPEN_MINIMODAL = "OPEN_MINIMODAL";
export const SELECT_ACCOUNT = "SELECT_ACCOUNT";
export const CLOSE_MINI_MODAL = "CLOSE_MINI_MODAL";
export const ADD_ACCOUNT = "ADD_ACCOUNT";
export const ADD_EXPENSE = "ADD_EXPENSE";

export const openMiniModal = (category) => (dispatch) => {
  dispatch({
    type: OPEN_MINIMODAL,
    payload: {
      open: true,
      category: category,
    },
  });
};
export const closeMiniModal = () => (dispatch) => {
  dispatch({
    type: CLOSE_MINI_MODAL,
    payload: {
      open: false,
    },
  });
};
export const selectAccount = (account) => (dispatch) => {
  dispatch({
    type: SELECT_ACCOUNT,
    payload: {
      selectAccount: account,
      select: true,
    },
  });
};
export const addNewAccount = (newAcc) => (dispatch) => {
  dispatch({
    type: ADD_ACCOUNT,
    payload: {
      newAccount: newAcc,
    },
  });
};
export const addNewExpense = (newExp, newAccount) => (dispatch) => {
  dispatch({
    type: ADD_EXPENSE,
    payload: {
      newExpense: newExp,
      newAccount: newAccount,
    },
  });
};
