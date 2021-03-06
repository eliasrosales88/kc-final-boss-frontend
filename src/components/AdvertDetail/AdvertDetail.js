import React, { useCallback, useEffect } from "react";
import * as actions from "../../store/actions";
import { connect } from "react-redux";
import { getAdvert } from "../../store/selectors";
import "./AdvertDetail.css";
import { Typography } from "@material-ui/core";
import { TwitterShareButton } from "react-twitter-embed";

const getIdFromRoute = (history) => {
  let id = history.location.pathname.split("_id__");
  return id[1];
}

const AdvertDetail = props => {
  const { history, onGetAdvert, advert } = props;
  const {name, price, description, photo, owner, forSale} = advert;
  

  let id = getIdFromRoute(history);

  const getAdvert = useCallback(() => {
    onGetAdvert(id);
  }, [id, onGetAdvert]);

  useEffect(() => {
    getAdvert();
  }, [getAdvert]);

  return (
    <div className="advert-detail-container">
      <div className='advert-detail-image'>
          <img src={photo} alt={name} />
      </div>
      <div className='advert-detail-content'>
        <div className='advert-detail-title'>
          <h2>
          {name}
          </h2>
        </div>
        <div className='advert-detail-info'>
          <div className='price'>${price}</div>
          <div>
          <TwitterShareButton
          url={`${window.location.href}`}
          options={{ text: "#wallaclone" + name, via: "wallaclone" }}
        />
          </div>
          <span>Advert: </span><div className='for-sale'>{forSale ? "For Sale" : "Buy"}</div>
          <br />
          <span>By: </span><div className='owner'>{owner}</div>
        </div>
        <div className='advert-detail-description'>
        <Typography gutterBottom variant="h6" component="h2">
          Description
        </Typography>
        {description}
        </div>
      </div>
    </div>
  )
}




const mapStateToProps = state => {
  return {
    advert: getAdvert(state),
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onRouteHome: (name, id) => dispatch(actions.routeAdvertDetail({name, id})),
    onGetAdvert: (id) => dispatch(actions.getAdvert(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AdvertDetail);