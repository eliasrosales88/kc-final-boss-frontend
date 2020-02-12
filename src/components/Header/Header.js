import React from "react";
import { AppBar, Toolbar, Typography } from "@material-ui/core";
import SideNav from "../SideNav/SideNav";

import "./Header.css";
import { connect } from "react-redux";
import { getSession } from "../../store/selectors";
import UserMenu from "../UserMenu/UserMenu";
import AuthMenu from "../AuthMenu/AuthMenu";

const Header = props => {
  console.log(props);

  return (
    <AppBar position="static" className="header-main">
      <Toolbar>
        {/* <SideNav /> */}
        <Typography variant="h6">Wallaclone</Typography>

        <span className="spacer"></span>
        {props.sessionStore.username !== null ? <UserMenu /> : <AuthMenu />}
      </Toolbar>
    </AppBar>
  );
};

const mapStateToProps = state => {
  return {
    sessionStore: getSession(state)
  };
};
const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
