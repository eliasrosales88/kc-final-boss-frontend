import React, { Fragment } from "react";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { connect } from "react-redux";
import * as actions from "../../store/actions";

const AuthMenu = props => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  console.log(props);
  
  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Fragment>
      <Button
        color="inherit"
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        Sign in
      </Button>

      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={props.onRouteRegister}>Register</MenuItem>
        <MenuItem onClick={props.onRouteLogin}>Login</MenuItem>
      </Menu>
    </Fragment>
  );
};

const mapStateToProps = state => {
  return {
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onRouteRegister: () => dispatch(actions.routeRegister()),
    onRouteLogin: () => dispatch(actions.routeLogin()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthMenu);
