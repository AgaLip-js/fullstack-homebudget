import React, { useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Sidebar from "../../components/Sidebar/Sidebar";
import { loadUser } from "../../redux/actions/authActions";
import store from "../../redux/store/store";

const getComponentByState = (Component, authState, props) => {
  if (authState.isLoading) {
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

  return (
    <Route
      {...rest}
      render={(props) => getComponentByState(Component, auth, props)}
    />
  );
};
