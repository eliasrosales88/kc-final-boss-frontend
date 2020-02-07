import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { useForm } from "react-hook-form";
import * as actions from "../../store/actions";
import { connect } from "react-redux";

const Auth = (props) => {
  const [open, setOpen] = React.useState(false);
  const { register, handleSubmit, errors } = useForm({});

  const onSubmit = (data, e) => {
    e.preventDefault();
    props.onRegisterSubmit(data);
    
    // handleClose();
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button color="inherit" onClick={handleClickOpen}>
        Register
      </Button>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Registration</DialogTitle>

        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogContent>
            <DialogContentText>
              Please, fill the form below to register. Remember that you are
              accepting our cookie policy once registered.
            </DialogContentText>
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
            <p>{errors.password && "Invalid password, should have at least 8 characters"}</p>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button type="submit" color="primary">
              Register
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}

const mapStateToProps = state => {
  return {
  };
}
const mapDispatchToProps = dispatch => {
  return {
    onRegisterSubmit: (val) => dispatch(actions.registerUser(val)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)((Auth));