import axios from "axios";
import { GET_SUM_ACCOUNTS, GET_SUM_EXPENSES, GET_SUM_GROUP_CATEGORY } from ".";

export const getSumAccounts = (user_id) => (dispatch) => {
  axios
    .get(`/accounts/sum/${user_id}`)
    .then(({ data }) => {
      dispatch({
        type: GET_SUM_ACCOUNTS,
        payload: {
          sumAccounts: data,
        },
      });
    })
    .catch((err) => {
      console.error(err.message);
    });
};

export const getSumExpenses = (user_id) => (dispatch) => {
  axios
    .get(`/expenses/sum/${user_id}`)
    .then(({ data }) => {
      dispatch({
        type: GET_SUM_EXPENSES,
        payload: {
          sumExpenses: data,
        },
      });
    })
    .catch((err) => {
      console.error(err.message);
    });
};

export const getSumGroupCategory = (user_id) => (dispatch) => {
  axios
    .get(`/expenses/sum-group/${user_id}`)
    .then(({ data }) => {
      dispatch({
        type: GET_SUM_GROUP_CATEGORY,
        payload: {
          sumExpGroupCategory: data,
        },
      });
    })
    .catch((err) => {
      console.error(err.message);
    });
};
