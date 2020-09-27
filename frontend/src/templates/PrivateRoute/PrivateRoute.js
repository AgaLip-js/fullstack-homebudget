import React, { useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Sidebar from "../../components/Sidebar/Sidebar";
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
  const { auth, analysis } = useSelector((store) => ({
    auth: store.auth,
    analysis: store.analysis,
  }));

  useEffect(() => {
    const timeout = setTimeout(() => {
      dispatch(loadingAccounts(auth.user.id));
      dispatch(loadingExpenses(auth.user.id));
    }, 100);

    return () => {
      clearTimeout(timeout);
    };
  }, [auth.user.id, dispatch]);

  return (
    <Route
      {...rest}
      render={(props) => getComponentByState(Component, auth, analysis, props)}
    />
  );
};
