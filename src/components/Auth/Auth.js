import React, { Fragment } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

import { useForm } from "react-hook-form";
import * as actions from "../../store/actions";
import { connect } from "react-redux";
import {
  getSession,
  getAuthMessage,
  getAuth,
  userNotAllowed
} from "../../store/selectors";
import "./Auth.css";
import { withSnackbar } from "notistack";

const Auth = props => {
  const { register, handleSubmit, errors } = useForm({});
  const { notAuth, onRegisterSubmit, onLoginSubmit } = props;

  let authMethod = props.location.pathname;

  const onSubmit = (data, e) => {
    e.preventDefault();
    authMethod === "/register" ? onRegisterSubmit(data) : onLoginSubmit(data);
  };

  return (
    <Fragment>
      <div className="auth-container">
        <form className="auth-form" onSubmit={handleSubmit(onSubmit)}>
          {authMethod === "/register" && (
            <p>
              Fill the form below to register. Remember that you are accepting
              our cookie policy once registered.
            </p>
          )}
          <TextField
            required
            autoFocus
            margin="dense"
            id="username"
            name="username"
            label="Username"
            fullWidth
            error={!!errors.username}
            inputRef={register({ required: true, minLength: 5 })}
          />
          <p>
            {errors.username &&
              "Invalid username, should have at least 5 characters"}
          </p>
          {authMethod === "/register" && (
            <Fragment>
              <TextField
                required
                margin="dense"
                id="email"
                label="Email Address"
                name="email"
                type="email"
                fullWidth
                autoComplete="email"
                error={!!errors.email}
                inputRef={register({
                  pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                })}
              />
              <p>{errors.email && "Invalid email address"}</p>
            </Fragment>
          )}
          <TextField
            required
            margin="dense"
            id="password"
            label="Password"
            name="password"
            type="password"
            fullWidth
            error={!!errors.password}
            inputRef={register({ required: true, minLength: 8 })}
          />
          <p>
            {errors.password &&
              "Invalid password, should have at least 8 characters"}
          </p>
          <Button type="submit" variant="contained" className="auth-button">
            {authMethod === "/register" ? "Register" : "Login"}
          </Button>
        </form>
        {notAuth && (
          <div className="auth-message slideInUp">
            {props.notAllowedMessage === null ? props.notAllowedMessage: "Not Authenticated" }
          </div>
        )}
      </div>
    </Fragment>
  );
};

const mapStateToProps = state => {
  return {
    session: getSession(state),
    notAuth: userNotAllowed(state),
    notAllowedMessage: getAuthMessage(state),
    auth: getAuth(state)
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onRegisterSubmit: val => dispatch(actions.userRegister(val)),
    onLoginSubmit: val => dispatch(actions.userLogin(val))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withSnackbar(Auth));
