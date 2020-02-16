import React, { Fragment, useCallback, useEffect } from "react";
import { Divider } from "@material-ui/core";
import AdvertCard from "../AdvertCard/AdvertCard";
import { connect } from "react-redux";
import { withSnackbar } from "notistack";
import * as actions from "../../store/actions";
import { getAdverts } from "../../store/selectors";
import "./Home.css";

const Home = props => {
  const { onGetAdverts } = props;

  const getAdverts = useCallback(() => {
    onGetAdverts();
  }, [onGetAdverts]);

  useEffect(() => {
    getAdverts();
  }, [getAdverts]);

  return (
    <Fragment>
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
    onGetAdverts: (filters, otherParams) =>
      dispatch(actions.getAdverts(filters, otherParams))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withSnackbar(Home));
