import React, { useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Sidebar from "../../components/Sidebar/Sidebar";
import { loadUser } from "../../redux/actions/authActions";
import { selectTodo } from "../../redux/actions/itemsActions";
import store from "../../redux/store/store";

const getComponentByState = (Component, authState, items, props) => {
    if(authState.isLoading || items.isLoading){
        return <p>...Loading</p>
    }
    else if(!authState.isLoading && authState.isAuthenticated){
        return  <>
        <Sidebar />
        <Component {...props} />
      </>
    }
    else {
        return <Redirect
        to={{ pathname: "/login", state: { from: props.location } }}
      />
    }
}

export const PrivateRoute = ({ component: Component, ...rest }) => {
    const dispatch = useDispatch()
  const { auth } = useSelector((store) => ({
    auth: store.auth,
  }));
  const { items } = useSelector((store) => ({
    items: store.items,
  }));
useEffect(() => {
  setTimeout(() => {
    dispatch(selectTodo(auth.user.id));
  }, 100);
}, [auth.user.id])


  return (
    <Route
      {...rest}
      render={(props) =>
        getComponentByState(Component, auth, items, props)
      }
    />
  );
};
