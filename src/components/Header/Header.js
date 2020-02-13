import React from "react";
import { AppBar, Toolbar, Typography, LinearProgress } from "@material-ui/core";

import "./Header.css";
import { connect } from "react-redux";
import { getSession, getUi } from "../../store/selectors";
import UserMenu from "../UserMenu/UserMenu";
import AuthMenu from "../AuthMenu/AuthMenu";

const Header = props => {
  console.log(props);

  return (
    <AppBar position="static" className="header-main">
      <Toolbar>
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

export default connect(mapStateToProps, mapDispatchToProps)(Header);
