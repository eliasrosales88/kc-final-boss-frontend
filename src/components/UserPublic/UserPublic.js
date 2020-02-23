import React, { Fragment, useCallback, useEffect, useState } from "react";
import { Divider } from "@material-ui/core";
import AdvertCard from "../AdvertCard/AdvertCard";
import { connect } from "react-redux";
import { withSnackbar } from "notistack";
import * as actions from "../../store/actions";
import { getAdverts, getPaginatorCount, getUser, getUi, getUserAdvert } from "../../store/selectors";
import "./UserPublic.css";
import Filters from "../Filters/Filters";
import Pagination from "@material-ui/lab/Pagination";
import Error404 from '../Error404/Error404';

const defaultGetAdvertsParams = {
  limit: "8",
  sort: ["updatedAt", -1], //Default filter by newest
  includeTotal: "true"
};
const UserPublic = props => {
  console.log(props);
  const { onGetAdverts, paginatorCount, match, onGetUser, ui } = props;

  const owner = match.params.username;
  
  // const getAdverts = useCallback(() => {
  //   onGetAdverts({...defaultGetAdvertsParams, owner});
  // }, [owner, onGetAdverts]);
  
  
  // useEffect(() => {
  //   getAdverts();
  // }, [getAdverts]);

  const getUser = useCallback(() => {
    onGetUser({...defaultGetAdvertsParams, owner}, owner);
  }, [owner, onGetUser]);

  useEffect(() => {
    getUser();
  }, [getUser]);

 

  const [page, setPage] = React.useState(1);
  const handlePaginatorChange = (event, value) => {
    setPage(value);
    
    let skipAdverts = (value - 1) * parseInt(defaultGetAdvertsParams.limit);
    defaultGetAdvertsParams.skip = skipAdverts;
    onGetAdverts(defaultGetAdvertsParams);
  };

  return (
    <Fragment>
      {ui.error &&  
      <Fragment>
        <h3>{owner} not found</h3>
          <Error404 />
      </Fragment>
      }
      {!ui.error &&
        <Fragment>
        <h3>{owner}</h3>
        <div className="home-filters">
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
        {props.userAdverts.rows &&
          props.userAdverts.rows.map(advert => (
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
      />  
        </Fragment>
      
      }
      
    </Fragment>
  );
};

const mapStateToProps = state => {
  return {
    adverts: getAdverts(state),
    paginatorCount: getPaginatorCount(state),
    userFound: getUser(state),
    ui: getUi(state),
    userAdverts: getUserAdvert(state)
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onGetAdverts: params => dispatch(actions.getAdverts(params)),
    onGetUser: (userAdverts, user) => dispatch(actions.getUser(userAdverts, user))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withSnackbar(UserPublic));
