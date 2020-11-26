import React, { Fragment, Suspense, lazy, Component } from "react";
import { MuiThemeProvider, CssBaseline } from "@material-ui/core";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import theme from "./theme";
import GlobalStyles from "./GlobalStyles";
import * as serviceWorker from "./serviceWorker";
import Pace from "./shared/components/Pace";

const LoggedInComponent = lazy(() => import("./logged_in/components/Main"));

const LoggedOutComponent = lazy(() => import("./logged_out/components/Main"));

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <MuiThemeProvider theme={theme}>
          <CssBaseline />
          <GlobalStyles />
          <Pace color={theme.palette.secondary.main} />
          <Suspense fallback={<Fragment />}>
            <Switch>
              <Route path="/c">
                <LoggedInComponent />
              </Route>
              <Route>
                <LoggedOutComponent />
              </Route>
            </Switch>
          </Suspense>
        </MuiThemeProvider>
      </BrowserRouter>
    );
  }
}
//document.getElementsByTagName("html")[0].setAttribute("dir", "rtl");
serviceWorker.register();

export default App;
