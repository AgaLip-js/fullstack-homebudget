export const OPEN_MINIMODAL = "OPEN_MINIMODAL";
export const SELECT_ACCOUNT = "SELECT_ACCOUNT";
export const CLOSE_MINI_MODAL = "CLOSE_MINI_MODAL";
export const ADD_ACCOUNT = "ADD_ACCOUNT";
export const ADD_EXPENSE = "ADD_EXPENSE";
export const EDIT_ACCOUNT = "EDIT_ACCOUNT";
export const REMOVE_ACCOUNT = "REMOVE_ACCOUNT";
export const OPEN_WARNINGMODAL = "OPEN_WARNINGMODAL";
export const CLOSE_WARNINGMODAL = "CLOSE_WARNINGMODAL";

export const openMiniModal = (category, title) => (dispatch) => {
  dispatch({
    type: OPEN_MINIMODAL,
    payload: {
      open: true,
      category: category,
      title: title,
    },
  });
};
export const openWarningModal = () => (dispatch) => {
  dispatch({
    type: OPEN_WARNINGMODAL,
    payload: {
      openWM: true,
    },
  });
};
export const closeWarningModal = () => (dispatch) => {
  dispatch({
    type: CLOSE_WARNINGMODAL,
    payload: {
      openWM: false,
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

export const editAccount = (editAccount) => (dispatch) => {
  dispatch({
    type: EDIT_ACCOUNT,
    payload: {
      newAccount: editAccount,
    },
  });
};
export const removeAccount = (removeAccount) => (dispatch) => {
  dispatch({
    type: REMOVE_ACCOUNT,
    payload: {
      removeAccount: removeAccount,
    },
  });
};
