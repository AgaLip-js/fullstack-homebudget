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

function App() {
  const { auth } = useSelector((store) => ({
    auth: store.auth,
  }));
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUser());
    Aos.init({ duration: 1500, once: true });
  }, [auth.token]);
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <ToastContainer autoClose={2000} />
          <Router history={history}>
            <Switch>
              <Route exact path="/" component={LandingPage} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />
              <PrivateRoute
                exact
                path="/dashboard/summary"
                component={Summary}
              />
              <PrivateRoute
                exact
                path="/dashboard/analysis"
                component={Analysis}
              />
              <PrivateRoute
                exact
                path="/dashboard/planning"
                component={Planning}
              />
              <PrivateRoute
                exact
                path="/dashboard/userpanel"
                component={UserPanel}
              />
              <Redirect from="*" to="/" />
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
