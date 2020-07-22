import React, { useEffect, useState } from "react";
import {
  BrowserRouter,
  Route,
  Switch,
  Redirect,
  Router,
} from "react-router-dom";
import { ThemeProvider } from "styled-components";
import GlobalStyle from "./theme/GlobalStyle";
import { theme } from "./theme/MainTheme";
import Navbar from "./components/Navbar/Navbar";
import Aos from "aos";
import "aos/dist/aos.css";
import LandingPage from "./views/LandingPage";
import history from "./templates/history";
import Login from "./views/Login";
import { ToastContainer } from "react-toastify";
import Register from "./views/Register";
import Summary from "./views/Summary";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const checkAuthenticated = async () => {
    try {
      const res = await fetch("/authentication/verify", {
        method: "POST",
        headers: { token: localStorage.token },
      });
      console.log(res.data);
      const parseRes = await res.json();

      parseRes === true ? setIsAuthenticated(true) : setIsAuthenticated(false);
    } catch (err) {
      console.error(err.message);
    }
  };

  const setAuth = (boolean) => {
    setIsAuthenticated(boolean);
  };
  useEffect(() => {
    checkAuthenticated();
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
                  !isAuthenticated ? (
                    <LandingPage />
                  ) : (
                    <Redirect to="/dashboard/summary" />
                  )
                }
              />
              <Route
                exact
                path="/login"
                render={(props) =>
                  !isAuthenticated ? (
                    <Login {...props} setAuth={setAuth} />
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
                render={(props) =>
                  isAuthenticated ? (
                    <Summary {...props} setAuth={setAuth} />
                  ) : (
                    <Redirect to="/login" />
                  )
                }
              />
            </Router>
          </Switch>
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
}

export default App;
