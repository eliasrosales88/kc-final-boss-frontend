import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@material-ui/core';
import SideNav from "../SideNav/SideNav";


import "./Header.css";

const Header = () => {

  return (
      <AppBar position="static" className="header-main">
        <Toolbar>
        <SideNav />
          <Typography variant="h6" >
            Wallaclone
          </Typography>
          <span className="spacer"></span>
          <Button color="inherit">Register</Button>
        </Toolbar>
      </AppBar>
  );
}
export default Header;