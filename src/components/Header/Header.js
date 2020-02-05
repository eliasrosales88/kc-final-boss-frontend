import React from "react";
import { AppBar, Toolbar, Typography } from "@material-ui/core";
import SideNav from "../SideNav/SideNav";
import Auth from "../Auth/Auth";

import "./Header.css";

const Header = () => {
  return (
    <AppBar position="static" className="header-main">
      <Toolbar>
        <SideNav />
        <Typography variant="h6">Wallaclone</Typography>

        <span className="spacer"></span>
        
        <Auth />
      </Toolbar>
    </AppBar>
  );
};
export default Header;
