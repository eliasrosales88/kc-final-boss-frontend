import React, { useState, useEffect, useCallback } from "react";
import {
  getSession,
  getToken,
  getUi,
  getUser
} from "../../store/selectors";
import * as actions from "../../store/actions";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Button, TextField } from "@material-ui/core";
import "./UserEdit.css";
import { useForm } from "react-hook-form";
import { withSnackbar } from "notistack";

const UserEdit = props => {
  const { session, match, onGetUser, onUpdateUser } = props;
  const { register, handleSubmit, errors } = useForm({});

  const [user, setUser] = useState({
    ...props.userStore
  });
  
  //---------------------------------------------------------------------
  //---------------------------------------------------------------------
  
  const load = useCallback(() => {
    setUser({ ...props.userStore });

    if (
      props.userStore.username !== session.username ||
      props.userStore.username === undefined
    ) {
      onGetUser(match.params.username);
      setUser({...props.userStore });
    }
  }, [props.userStore, session.username, onGetUser, match.params.username]);

  const notify = useCallback(() => {
    if (props.ui.notification) {
      props.enqueueSnackbar("User updated", {
        anchorOrigin: {
          vertical: "top",
          horizontal: "center",
        },
        variant: "success",
        autoHideDuration: 1500
      });
    }else if(props.ui.notification !== undefined && !props.ui.notification ) {
      props.enqueueSnackbar("Something went wrong", {
        anchorOrigin: {
          vertical: "top",
          horizontal: "center",
        },
        variant: "error",
        autoHideDuration: 1500
      });
    }
  }, [props]);

  useEffect(() => {
    load();
    notify();
    }, [load, notify]);

  const onSubmit = (data, e) => {
    e.preventDefault();
    let dataToSend = {};
    dataToSend.username = user.username;
    dataToSend.email = user.email;
    dataToSend.about = user.about;
    dataToSend.twitter = user.twitter;
    dataToSend.updatedAt = new Date().toISOString();


    onUpdateUser(
      { body: dataToSend }
    );
  };


  const handleTextChange = event => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };
  //---------------------------------------------------------------------
  //---------------------------------------------------------------------

  return (
    <div>
      {user.username !== undefined &&
      <div className="user-edit-container">
        <div className="user-edit-info">
          
          <h1>{user.username}</h1>
        </div>
        <div className="user-edit-email">
          <div>email:</div>
          <div>{user.email}</div>
        </div>
        <form className="user-edit-form" onSubmit={handleSubmit(onSubmit)}>
          <TextField
            autoFocus
            id="twitter"
            label="Twitter"
            placeholder="Write your twitter"
            margin="dense"
            name="twitter"
            onChange={handleTextChange}
            defaultValue={user.twitter}
            fullWidth
            error={!!errors.twitter}
            inputRef={register()}
          />
          <p className="user-edit-error-label">
            {errors.name &&
              "Add a longer twitter, should have at least 12 characters"}
          </p>

          <TextField
            margin="dense"
            id="about"
            name="about"
            label="About"
            multiline
            defaultValue={user.about}
            onChange={handleTextChange}
            fullWidth
            error={!!errors.name}
            inputRef={register()}
          />


          <Button
            type="submit"
            variant="contained"
            className="user-edit-button"
          >
            SAVE
          </Button>
        </form>

      </div>
          }

    </div>
  );
};

const mapStateToProps = state => {
  return {
    session: getSession(state),
    userStore: getUser(state),
    token: getToken(state),
    ui: getUi(state)
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onUpdateUser: data => dispatch(actions.updateAccountUser(data)),
    onGetUser: username => dispatch(actions.getAccountUser(username))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(withSnackbar(UserEdit)));
