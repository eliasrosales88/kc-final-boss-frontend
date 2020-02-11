import React, { Fragment } from "react";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { getSession } from "../../store/selectors";
import { connect } from "react-redux";

const UserMenu = (props) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

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
        <MenuItem onClick={handleClose}>Account</MenuItem>
        <MenuItem onClick={handleClose}>Logout</MenuItem>
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserMenu);