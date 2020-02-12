import React, { Fragment } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

import { useForm } from "react-hook-form";
import * as actions from "../../store/actions";
import { connect } from "react-redux";
import { getSession } from "../../store/selectors";
import "./Auth.css";

const Auth = props => {
  const { register, handleSubmit, errors } = useForm({});

  console.log(props);

  const onSubmit = (data, e) => {
    e.preventDefault();
    props.onRegisterSubmit(data);
  };


  return (
    <Fragment>
        <form onSubmit={handleSubmit(onSubmit)}>
              Fill the form below to register. Remember that you are
              accepting our cookie policy once registered.
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
              Register
            </Button>
        </form>
    </Fragment>
  );
};

const mapStateToProps = state => {
  return {
    sessionStore: getSession(state)
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onRegisterSubmit: val => dispatch(actions.registerUser(val)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
