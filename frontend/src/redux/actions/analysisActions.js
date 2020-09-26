import axios from "axios";
export const OPEN_MINIMODAL = "OPEN_MINIMODAL";
export const SELECT_ACCOUNT = "SELECT_ACCOUNT";
export const CLOSE_MINI_MODAL = "CLOSE_MINI_MODAL";
export const ADD_ACCOUNT = "ADD_ACCOUNT";
export const ADD_EXPENSE = "ADD_EXPENSE";
export const EDIT_ACCOUNT = "EDIT_ACCOUNT";
export const REMOVE_ACCOUNT = "REMOVE_ACCOUNT";
export const OPEN_WARNINGMODAL = "OPEN_WARNINGMODAL";
export const CLOSE_WARNINGMODAL = "CLOSE_WARNINGMODAL";
export const LOADING_ACCOUNTS = "LOADING_ACCOUNTS";
export const LOADING_EXPENSES = "LOADING_EXPENSES";

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

export const addNewAccount = (newAccount) => (dispatch) => {
  let newAcc = {
    user_id: newAccount.user_id,
    title: newAccount.title,
    category: newAccount.category,
    quantity: newAccount.quantity,
    type: newAccount.type,
    date: newAccount.date,
  };
  axios
    .post("/accounts", newAcc)
    .then(({ data }) => {
      console.log(data);
      dispatch({
        type: ADD_ACCOUNT,
        payload: {
          newAccount: data,
        },
      });
    })
    .catch((err) => {
      console.error(err.message);
    });
};

export const addNewExpense = (newExp, newAccount) => (dispatch) => {
  let newExpense = {
    user_id: newExp.user_id,
    idaccount: newExp.idaccount,
    quantity: newExp.quantity,
    category: newExp.category,
    groupcategory: newExp.groupcategory,
    title: newExp.title,
    type: newExp.type,
    date: newExp.date,
  };

  axios
    .post("/expenses", newExpense, newAccount)
    .then(({ data }) => {
      axios.put(`/accounts/${newAccount.id}`, newAccount);
      dispatch({
        type: ADD_EXPENSE,
        payload: {
          newExpense: data,
          newAccount: newAccount,
        },
      });
    })
    .catch((err) => {
      console.error(err.message);
    });
};

export const loadingAccounts = (user_id) => (dispatch) => {
  axios
    .get(`/accounts/${user_id}`)
    .then(({ data }) => {
      dispatch({
        type: LOADING_ACCOUNTS,
        payload: {
          accounts: data,
        },
      });
    })
    .catch((err) => {
      console.error(err.message);
    });
};
export const loadingExpenses = (user_id) => (dispatch) => {
  axios
    .get(`/expenses/${user_id}`)
    .then(({ data }) => {
      dispatch({
        type: LOADING_EXPENSES,
        payload: {
          expenses: data,
        },
      });
    })
    .catch((err) => {
      console.error(err.message);
    });
};

export const editAccount = (id, newAccount) => (dispatch) => {
  let editAccount = {
    title: newAccount.title,
    category: newAccount.category,
    quantity: newAccount.quantity,
    date: newAccount.date,
    type: newAccount.type,
    id: id,
  };
  axios
    .put(`/accounts/${id}`, editAccount)
    .then(() => {
      dispatch({
        type: EDIT_ACCOUNT,
        payload: {
          newAccount: editAccount,
        },
      });
    })

    .catch((err) => {
      console.error(err.message);
    });
};
export const removeAccount = (id) => (dispatch) => {
  axios
    .delete(`/accounts/${id}`)
    .then(() => {
      dispatch({
        type: REMOVE_ACCOUNT,
        payload: {
          id,
        },
      });
    })
    .catch((err) => {
      console.error(err.message);
    });
};
