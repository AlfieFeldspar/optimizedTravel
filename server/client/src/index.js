import React, { Fragment } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import ReduxPromise from "redux-promise";
import "./index.css";
import reducers from "./reducers";
import App from "./components/App";
import LaunchPage from "./components/LaunchPage";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <Router>
      <Fragment>
        <Switch>
          <Route exact path="/">
            <Redirect to="/launch" />
          </Route>
          <Route exact path="/app" component={App} />
          <Route exact path="/launch" component={LaunchPage} />
        </Switch>
      </Fragment>
    </Router>
  </Provider>,
  document.getElementById("root")
);
