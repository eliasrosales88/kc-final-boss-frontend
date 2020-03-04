import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import { connect } from "react-redux";
import { Button } from "@material-ui/core";
import * as actions from "../../store/actions";
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

const DeleteAdvertModal = (props) => {
  
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
        DELETE
      </span>
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={open}
        onClose={handleClose}
      >
        <div style={modalStyle} className={classes.paper}>
          <h2 id="simple-modal-title">You are about to delete this advert. This cannot be undone.</h2>
          <p id="simple-modal-description">
          </p>
          <Button onClick={() => {
            props.onDeleteAdvert(props.advertToDelete, props.updateAdvertList)
            handleClose();
            }}> Delete</Button>
            <Button onClick={handleClose}> Cancel</Button>
        </div>
      </Modal>
    </div>
  );
};

const mapStateToProps = state => {
  return {};
};
const mapDispatchToProps = dispatch => {
  return {
    onDeleteAdvert: (advertId, updateAdvertList) => dispatch(actions.deleteAdvert(advertId, updateAdvertList))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DeleteAdvertModal);
