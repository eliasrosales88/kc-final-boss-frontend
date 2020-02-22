import React, { Fragment, useCallback, useEffect } from "react";
import { Divider } from "@material-ui/core";
import AdvertCard from "../AdvertCard/AdvertCard";
import { connect } from "react-redux";
import { withSnackbar } from "notistack";
import * as actions from "../../store/actions";
import { getAdverts, getPaginatorCount } from "../../store/selectors";
import "./UserPublic.css";
import Filters from "../Filters/Filters";
import Pagination from "@material-ui/lab/Pagination";

const defaultGetAdvertsParams = {
  limit: "8",
  sort: ["updatedAt", -1], //Default filter by newest
  includeTotal: "true"
};
const UserPublic = props => {
  console.log(props);
  const { onGetAdverts, paginatorCount, match } = props;

  const owner = match.params.username;
  
  const getAdverts = useCallback(() => {
    onGetAdverts({...defaultGetAdvertsParams, owner});
  }, [owner, onGetAdverts]);

  useEffect(() => {
    getAdverts();
  }, [getAdverts]);

  const [page, setPage] = React.useState(1);
  const handlePaginatorChange = (event, value) => {
    setPage(value);
    console.log("PAGE", value);
    
    let skipAdverts = (value - 1) * parseInt(defaultGetAdvertsParams.limit);
    defaultGetAdvertsParams.skip = skipAdverts;
    onGetAdverts(defaultGetAdvertsParams);
  };

  return (
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
      />
    </Fragment>
  );
};

const mapStateToProps = state => {
  return {
    adverts: getAdverts(state),
    paginatorCount: getPaginatorCount(state)
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onGetAdverts: params => dispatch(actions.getAdverts(params))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withSnackbar(UserPublic));
