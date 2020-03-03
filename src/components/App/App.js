import React, { Fragment } from "react";
import "./App.css";
import Layout from "../Layout/Layout";
import ErrorBoundary from "../ErrorBoundary";
import { Route, Switch, withRouter } from "react-router-dom";
import Auth from "../Auth/Auth";
import Home from "../Home/Home";
import AdvertDetail from "../AdvertDetail/AdvertDetail";
import UserPublic from "../UserPublic/UserPublic";
import Account from "../Account/Account";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import Error404 from "../Error404/Error404";
import AdvertEdit from "../AdvertEdit/AdvertEdit";
import AdvertCreate from "../AdvertCreate/AdvertCreate";

const App = props => {
  return (
    <Fragment>
      <ErrorBoundary>
        <Layout
          mainContainerClassName="main-container"
          sectionTitle={titleHandler(props.location.pathname)}
        >
          <Switch>
            <Route path="/register" exact component={Auth} />
            <Route path="/login" exact component={Auth} />
            <Route path="/" exact component={Home} />
            <Route path="/advert/:id" exact component={AdvertDetail} />
            <Route path="/user/:username" exact component={UserPublic} />
            <PrivateRoute path="/account" exact component={Account} />
            <PrivateRoute path="/account/advert/create" exact component={AdvertCreate} />
            <PrivateRoute
              path="/account/advert/:id"
              exact
              component={AdvertEdit}
            />
            <Route component={Error404} />
          </Switch>
        </Layout>
      </ErrorBoundary>
    </Fragment>
  );
};

const titleHandler = key => {
  switch (key) {
    case "/register":
      return "Register";
    case "/login":
      return "Login";
    case "/account":
      return "Account";
    case "/account/advert/create":
      return "Create Advert";
    case "/account/advert/:id":
      return "Edit";

    default:
      return "";
  }
};

export default withRouter(App);
