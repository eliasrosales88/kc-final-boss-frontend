import React, { Fragment } from "react";
import "./App.css";
import Layout from "../Layout/Layout";
import ErrorBoundary from "../ErrorBoundary";
import { Route, Switch, withRouter } from "react-router-dom";
import Auth from "../Auth/Auth";
import Home from "../Home/Home";
import AdvertDetail from "../AdvertDetail/AdvertDetail";
import UserPublic from "../UserPublic/UserPublic";



const App = (props) => {

  return (
    <Fragment>
      <ErrorBoundary>
        <Layout
          mainContainerClassName="main-container"
          sectionTitle= {titleHandler(props.location.pathname)}
        >
          <Switch>
            <Route path="/register" exact component={Auth} />
            <Route path="/login" exact component={Auth} />
            <Route path="/" exact component={Home} />
            <Route path="/advert/:id" exact component={AdvertDetail} />
            <Route path="/user/:username" exact component={UserPublic} />
            {/* <PrivateRoute path="/profile" exact component={Profile} />
     <PrivateRoute path="/advert/new" exact component={AdvertEdit} />
     <PrivateRoute path="/advert/:id/edit" exact component={AdvertEdit} />
     <PrivateRoute component={Error404} /> */}
          </Switch>
        </Layout>
      </ErrorBoundary>
    </Fragment>
  );
};

const titleHandler = (key) => {
  switch (key) {
    case "/register":
      return "Register"
    case "/login":
      return "Login"
  
    default:
      return "";
  }
}

export default withRouter(App);
