import React, { Fragment, useCallback, useEffect } from "react";
import { Divider } from "@material-ui/core";
import AdvertCard from "../AdvertCard/AdvertCard";
import { connect } from "react-redux";
import { withSnackbar } from "notistack";
import * as actions from "../../store/actions";
import {
  getAdverts,
  getPaginatorCount,
  getToken,
  getSession
} from "../../store/selectors";
import Filters from "../Filters/Filters";
import Pagination from "@material-ui/lab/Pagination";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";
import UpdateIcon from "@material-ui/icons/Update";
import DeleteIcon from "@material-ui/icons/Delete";

import "./Account.css";
import EnhancedTable from "../EnhancedTable/EnhancedTable";
const defaultGetAdvertsParams = {
  limit: "8",
  sort: ["updatedAt", -1], //Default filter by newest
  includeTotal: "true"
};
const Account = props => {
  console.log(props);
  const { onGetAdverts, paginatorCount, token, session, adverts } = props;
console.log('ADVERTS', adverts);

  const owner = session.username;

  const getAdverts = useCallback(() => {
    onGetAdverts({ ...defaultGetAdvertsParams, owner, token });
  }, [onGetAdverts, owner, token]);

  useEffect(() => {
    getAdverts();
  }, [getAdverts]);

  const [page, setPage] = React.useState(1);
  const handlePaginatorChange = (event, value) => {
    setPage(value);

    let skipAdverts = (value - 1) * parseInt(defaultGetAdvertsParams.limit);
    defaultGetAdvertsParams.skip = skipAdverts;
    onGetAdverts(defaultGetAdvertsParams);
  };

  return (
    <Fragment>
      <h3>{owner}</h3>
      <Divider />
      <List component="nav" aria-label="main mailbox folders">
        <ListItem button>
          <ListItemIcon>
            <AddIcon />
          </ListItemIcon>
          <ListItemText primary="Create Advert" />
        </ListItem>
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
      </List>

      {adverts.rows  && 
        <EnhancedTable adverts={adverts} />
      }

      {/* <div className="home-filters">
        <Filters defaultGetAdvertsParams={{...defaultGetAdvertsParams, owner}} />
      </div>
      <Divider />
      <Pagination
        count={paginatorCount}
        onChange={handlePaginatorChange}
        variant="outlined"
        shape="rounded"
        className="home-paginator"
        page={page}
        siblingCount={0}
      />

      <div className="home-advert-list">
        {props.adverts.rows &&
          props.adverts.rows.map(advert => (
            <div key={advert._id}>
              <AdvertCard
                id={advert._id}
                name={advert.name}
                description={advert.description}
                price={advert.price}
                type={advert.type}
                photo={advert.photo}
                tags={advert.tags}
                forSale={advert.forSale}
                createdAt={advert.createdAt}
                updatedAt={advert.updatedAt}
                owner={advert.owner}
                match
              />
            </div>
          ))}
      </div>
      <Pagination
        count={paginatorCount}
        onChange={handlePaginatorChange}
        variant="outlined"
        shape="rounded"
        className="home-paginator"
        page={page}
        siblingCount={0}
      /> */}
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
    onGetAdverts: params => dispatch(actions.getAdverts(params))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withSnackbar(Account));
