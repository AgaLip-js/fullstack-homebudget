import React, { useEffect } from "react";
import {
  BrowserRouter,
  Route,
  Switch,
  Redirect,
  Router,
} from "react-router-dom";
import { Provider, useSelector, useDispatch } from "react-redux";
import { ThemeProvider } from "styled-components";
import GlobalStyle from "./theme/GlobalStyle";
import { theme } from "./theme/MainTheme";
import Aos from "aos";
import "aos/dist/aos.css";
import LandingPage from "./views/LandingPage";
import history from "./templates/history";
import Login from "./views/Login";
import { ToastContainer } from "react-toastify";
import Register from "./views/Register";
import Summary from "./views/Summary";
import { loadUser } from "./redux/actions/authActions";
import store from "./redux/store/store";
import "react-toastify/dist/ReactToastify.css";
import Analysis from "./views/Analysis";
import Planning from "./views/Planning";
import UserPanel from "./views/UserPanel";
import { PrivateRoute } from "./templates/PrivateRoute/PrivateRoute";
import routes from "./_constants/routes";

function App() {
  const { auth } = useSelector((store) => ({
    auth: store.auth,
  }));
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUser());
    Aos.init({ duration: 1500, once: true });
  }, [auth.token, dispatch]);

  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <ToastContainer autoClose={2000} />
          <Router history={history}>
            <Switch>
              <Route exact path={routes.main} component={LandingPage} />
              <Route exact path={routes.login} component={Login} />
              <Route exact path={routes.register} component={Register} />
              <PrivateRoute exact path={routes.summary} component={Summary} />
              <PrivateRoute exact path={routes.analysis} component={Analysis} />
              <PrivateRoute exact path={routes.planning} component={Planning} />
              <PrivateRoute
                exact
                path={routes.userpanel}
                component={UserPanel}
              />
              <Redirect from="*" to={routes.main} />
            </Switch>
          </Router>
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
}

const AppWrapper = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};
export default AppWrapper;
