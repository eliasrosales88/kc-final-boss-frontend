import React, { Fragment } from "react";
import "./App.css";
import Layout from "../Layout/Layout";
import ErrorBoundary from "../ErrorBoundary";
import { Route, Switch, withRouter } from "react-router-dom";
import Auth from "../Auth/Auth";



const App = (props) => {

  console.log(props);
  
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
            {/* <PrivateRoute path="/profile" exact component={Profile} />
     <PrivateRoute path="/advert/new" exact component={AdvertEdit} />
     <PrivateRoute path="/advert/:id/edit" exact component={AdvertEdit} />
     <PrivateRoute path="/advert/:id" exact component={AdvertDetail} />
     <PrivateRoute path="/" exact component={Home} />
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
      return "Wallaclone";
  }
}

export default withRouter(App);
