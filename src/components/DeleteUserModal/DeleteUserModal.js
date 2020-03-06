import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import { connect } from "react-redux";
import { Button } from "@material-ui/core";
import * as actions from "../../store/actions";
import { getSession } from "../../store/selectors";
function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`
  };
}

const useStyles = makeStyles(theme => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3)
  }
}));

const DeleteUserModal = (props) => {
  
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <span  onClick={handleOpen}>
      Delete account
      </span>
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={open}
        onClose={handleClose}
      >
        <div style={modalStyle} className={classes.paper}>
          <h2 id="simple-modal-title">You are about to delete your account and all related published adverts. This cannot be undone.</h2>
          <p id="simple-modal-description">
          </p>
          <Button onClick={() => {
            props.onDeleteUser(props.session.username)
            handleClose();
            }}> Delete</Button>
            <Button onClick={handleClose}> Cancel</Button>
        </div>
      </Modal>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    session: getSession(state)
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onDeleteUser: (username) => dispatch(actions.deleteUser(username))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DeleteUserModal);
