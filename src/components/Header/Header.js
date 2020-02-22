import React from "react";
import { AppBar, Toolbar, Typography, LinearProgress } from "@material-ui/core";

import "./Header.css";
import { connect } from "react-redux";
import { getSession, getUi } from "../../store/selectors";
import UserMenu from "../UserMenu/UserMenu";
import AuthMenu from "../AuthMenu/AuthMenu";

import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { withRouter } from "react-router-dom";

const Header = props => {
  const { history, match } = props;
  const isHome = match.path === '/' && match.isExact ? true : false; 

  return (
    <AppBar position="static" className="header-main">
      <Toolbar>
        { !isHome &&
        <ArrowBackIcon className='header-back' onClick={history.goBack}></ArrowBackIcon>
        }
        <Typography variant="h6">Wallaclone</Typography>

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
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Header));
