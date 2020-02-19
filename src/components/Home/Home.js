import React, { Fragment, useCallback, useEffect } from "react";
import { Divider } from "@material-ui/core";
import AdvertCard from "../AdvertCard/AdvertCard";
import { connect } from "react-redux";
import { withSnackbar } from "notistack";
import * as actions from "../../store/actions";
import { getAdverts } from "../../store/selectors";
import "./Home.css";
import Filters from "../Filters/Filters";
const defaultGetAdvertsParams = {
  limit: "8",
  sort: "",
  includeTotal: "true"
}
const Home = props => {
  const { onGetAdverts } = props;

  const getAdverts = useCallback(() => {
    onGetAdverts(defaultGetAdvertsParams);
  }, [onGetAdverts]);

  useEffect(() => {
    getAdverts();
  }, [getAdverts]);

  return (
    <Fragment>
      <div className="home-filters">
        <Filters />
      </div>
      <Divider />
      <div className="home-advert-list">
        {props.adverts.rows &&
          props.adverts.rows.map(advert => (
            <div className="home-advert-list-item" key={advert._id}>
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
              />
            </div>
          ))}
      </div>
    </Fragment>
  );
};

const mapStateToProps = state => {
  return {
    // session: getSession(state),
    // notAuth: userNotAllowed(state),
    // notAllowedMessage: getAuthMessage(state),
    // auth: getAuth(state)
    adverts: getAdverts(state)
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onGetAdverts: (params) =>
      dispatch(actions.getAdverts(params))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withSnackbar(Home));
