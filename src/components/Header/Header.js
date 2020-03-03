import React from "react";
import { AppBar, Toolbar, Typography, LinearProgress } from "@material-ui/core";

import "./Header.css";
import { connect } from "react-redux";
import { getSession, getUi } from "../../store/selectors";
import UserMenu from "../UserMenu/UserMenu";
import AuthMenu from "../AuthMenu/AuthMenu";

import * as actions from "../../store/actions";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { withRouter } from "react-router-dom";

const Header = props => {
  const { history, match , onRouteHome} = props;
  const isHome = match.path === '/' && match.isExact ? true : false; 

  return (
    <AppBar position="static" className="header-main">
      <Toolbar>
        { !isHome &&
        <ArrowBackIcon className='header-back' onClick={history.goBack}></ArrowBackIcon>
        }
        <Typography variant="h6" onClick={onRouteHome} className='home'>Wallaclone</Typography>

        <span className="spacer"></span>
        {props.sessionStore.username !== null ? <UserMenu /> : <AuthMenu />}
      </Toolbar>
      {props.ui.loading && <LinearProgress className="loader" />}
    </AppBar>
  );
};

const mapStateToProps = state => {
  return {
    sessionStore: getSession(state),
    ui: getUi(state)
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onRouteHome: ()=> dispatch(actions.routeHome())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Header));
