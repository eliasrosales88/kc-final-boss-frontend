import React, { Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Drawer, List, ListItem, ListItemIcon, ListItemText, IconButton } from '@material-ui/core';

import MenuIcon from '@material-ui/icons/Menu';
import BallotIcon from '@material-ui/icons/Ballot';
import PersonIcon from '@material-ui/icons/Person';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

const useStyles = makeStyles({
  list: {
    width: 250
  },
  fullList: {
    width: "auto"
  }
});

export default function SideNav() {
  const classes = useStyles();
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false
  });

  const toggleDrawer = (side, open) => event => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [side]: open });
  };

  const loginList = (index) => {
    switch (index) {
      case 0:
        return  <Fragment><BallotIcon /></Fragment>;
      case 1:
        return  <Fragment><PersonIcon /></Fragment>;
      case 2:
        return  <Fragment><ExitToAppIcon /></Fragment>;
    
      default:
        return null;
    }
  }
  const sideList = side => (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer(side, false)}
      onKeyDown={toggleDrawer(side, false)}
    >

      
      <List>
        {["My adverts", "My Account", "Logout"].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>
                {loginList(index)}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <div>
      <IconButton onClick={toggleDrawer("left", true)} edge="start" color="inherit" aria-label="menu">
        <MenuIcon />
      </IconButton>
     
      <Drawer open={state.left} onClose={toggleDrawer("left", false)}>
        {sideList("left")}
      </Drawer>

    </div>
  );
}
