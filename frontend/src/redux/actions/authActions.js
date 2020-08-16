import axios from "axios";
import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
} from "./";
import { returnErrors } from "./errorActions";
import setAuthToken from "../utils/setAuthToken";
import history from "../../templates/history";

// check token & load user
export const loadUser = () => (dispatch, getState) => {
  // User loading
  dispatch({ type: USER_LOADING });
  axios
    .get("/user/dashboard", tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: USER_LOADED,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: AUTH_ERROR,
      });
    });
};

// Register User
export const register = (userData) => (dispatch) => {
  axios
    .post("/user/register", userData)
    .then((res) => {
      console.log(res);
      if (res.data === "User already exist!") {
        console.log("User exists!");
      } else {
        dispatch({
          type: REGISTER_SUCCESS,
          payload: res.data,
        });
        history.push("/login");
      }
    })
    .catch((err) => {
      dispatch(
        returnErrors(err.response.data, err.response.status, "REGISTER_FAIL")
      );
      dispatch({
        type: REGISTER_FAIL,
      });
    });
};

export const login = (user) => (dispatch) => {
  axios
    .post("/user/login", user)
    .then((res) => {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });
    })

    .catch((err) => {
      dispatch(
        returnErrors(err.response.data, err.response.status, "LOGIN_FAIL")
      );
      dispatch({
        type: LOGIN_FAIL,
      });
    });
};

export const tokenConfig = (getState) => {
  // Get token from localstorage

  const token = getState().auth.token;
  // Headers
  const config = {
    headers: {
      "Content-type": "application/json",
    },
  };

  // If token, add to headers
  if (token) {
    config.headers["token"] = token;
  }

  return config;
};
export const setCurrentUser = (decoded) => {
  return {
    type: LOGOUT_SUCCESS,
  };
};
export const logoutUser = () => (dispatch) => {
  // Remove token from localStorage
  localStorage.removeItem("token");
  // Remove auth header for future requests
  setAuthToken(false);
  // Set current user to {} which will set isAuthenticated to false
  dispatch(setCurrentUser({}));
};
