import React, { Fragment } from "react";
import { Divider } from "@material-ui/core";
import { connect } from "react-redux";
import { withSnackbar } from "notistack";
import * as actions from "../../store/actions";
import {
  getAdverts,
  getPaginatorCount,
  getToken,
  getSession
} from "../../store/selectors";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import AddIcon from "@material-ui/icons/Add";
import UpdateIcon from "@material-ui/icons/Update";
import DeleteIcon from "@material-ui/icons/Delete";

import "./Account.css";
import EnhancedTable from "../EnhancedTable/EnhancedTable";

const Account = props => {
  const { onRouteAcountAdvertCreate, session } = props;

  const owner = session.username;


  
  

  return (
    <Fragment>
      <h3>{owner}</h3>
      
      <List component="nav" aria-label="main mailbox folders">
        <ListItem button>
          <ListItemIcon>
            <UpdateIcon />
          </ListItemIcon>
          <ListItemText primary="Update user info" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <DeleteIcon />
          </ListItemIcon>
          <ListItemText primary="Delete account" />
        </ListItem>
        <Divider />
        <ListItem button onClick={onRouteAcountAdvertCreate}>
          <ListItemIcon>
            <AddIcon />
          </ListItemIcon>
          <ListItemText primary="Create Advert" />
        </ListItem>
      </List>

        <EnhancedTable />

    </Fragment>
  );
};

const mapStateToProps = state => {
  return {
    adverts: getAdverts(state),
    session: getSession(state),
    paginatorCount: getPaginatorCount(state),
    token: getToken(state)
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onGetAdverts: params => dispatch(actions.getAdverts(params)),
    onRouteAcountAdvertCreate: () => dispatch(actions.routeAcountAdvertCreate())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withSnackbar(Account));
