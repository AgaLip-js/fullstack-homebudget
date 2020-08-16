import React, { useEffect } from "react";
import {
  BrowserRouter,
  Route,
  Switch,
  Redirect,
  Router,
} from "react-router-dom";
import { Provider, useSelector } from "react-redux";
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

function App() {
  const { auth } = useSelector((store) => ({
    auth: store.auth,
  }));

  useEffect(() => {
    store.dispatch(loadUser());
    Aos.init({ duration: 1500, once: true });
  }, []);

  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <ToastContainer />
          <Switch>
            <Router history={history}>
              <Route
                exact
                path="/"
                render={() =>
                  !auth.isAuthenticated ? (
                    <LandingPage />
                  ) : (
                    <Redirect to="/dashboard/summary" />
                  )
                }
              />
              <Route
                exact
                path="/login"
                render={() =>
                  !auth.isAuthenticated ? (
                    <Login />
                  ) : (
                    <Redirect to="/dashboard/summary" />
                  )
                }
              />
              <Route
                exact
                path="/register"
                component={Register}
                render={() => <Redirect to="/login" />}
              />
              <Route
                exact
                path="/dashboard/summary"
                render={() =>
                  auth.isAuthenticated ? <Summary /> : <Redirect to="/login" />
                }
              />
            </Router>
          </Switch>
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
