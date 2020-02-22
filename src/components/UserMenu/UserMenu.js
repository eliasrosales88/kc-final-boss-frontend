import React, { Fragment } from "react";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { getSession } from "../../store/selectors";
import { connect } from "react-redux";
import * as actions from "../../store/actions";

const UserMenu = (props) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const {onUserLogout, onRouteAccount} = props;

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    onUserLogout();
    handleClose();
  }

  const handleAccount = () => {
    onRouteAccount();
    handleClose();
  }

  return (
    <Fragment>
      <Button 
      color="inherit"
      aria-controls="simple-menu"
      aria-haspopup="true"
      onClick={handleClick}
      >
        {
          <Fragment>
          {props.sessionStore.username}
          </Fragment>
        }
      </Button>
  
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleAccount}>Account</MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </Fragment>
  );
}

const mapStateToProps = state => {
  return {
    sessionStore: getSession(state)
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onUserLogout: () => dispatch(actions.userLogout()),
    onRouteAccount: () => dispatch(actions.routeAcount())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserMenu);