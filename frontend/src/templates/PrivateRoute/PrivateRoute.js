import React, { useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Sidebar from "../../components/Sidebar/Sidebar";
import { loadUser } from "../../redux/actions/authActions";
import store from "../../redux/store/store";
import {
  loadingAccounts,
  loadingExpenses,
} from "../../redux/actions/analysisActions";

const getComponentByState = (Component, authState, analysis, props) => {
  if (authState.isLoading || analysis.isLoadingAcc || analysis.isLoadingExp) {
    return <p>...Loading</p>;
  } else if (!authState.isLoading && authState.isAuthenticated) {
    return (
      <>
        <Sidebar />
        <Component {...props} />
      </>
    );
  } else {
    return (
      <Redirect to={{ pathname: "/login", state: { from: props.location } }} />
    );
  }
};

export const PrivateRoute = ({ component: Component, ...rest }) => {
  const dispatch = useDispatch();
  const { auth } = useSelector((store) => ({
    auth: store.auth,
  }));
  const { analysis } = useSelector((store) => ({
    analysis: store.analysis,
  }));
  useEffect(() => {
    setTimeout(() => {
      dispatch(loadingAccounts(auth.user.id));
      dispatch(loadingExpenses(auth.user.id));
    }, 100);
  }, [auth.user.id]);

  return (
    <Route
      {...rest}
      render={(props) => getComponentByState(Component, auth, analysis, props)}
    />
  );
};
