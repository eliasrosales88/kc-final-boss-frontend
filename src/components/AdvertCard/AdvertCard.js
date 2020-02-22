import React, { Fragment } from "react";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import { Button, Chip } from "@material-ui/core";
import * as actions from "../../store/actions";
import { TwitterShareButton } from "react-twitter-embed";

import "./AdvertCard.css";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

const AdvertCard = props => {
  const { onRouteAdvertDetail, onRouteUserPublic, match } = props;
  const {
    id,
    name,
    description,
    price,
    photo,
    tags,
    updatedAt,
    forSale,
    owner,
  } = props;

  let urlName = name.replace(/\s/g, "%20");
  console.log("urlName", urlName);
  

  const convertDate = updatedAt => {
    let dateToConvert = new Date(updatedAt).toLocaleTimeString();
    let year = new Date(updatedAt).getFullYear();
    let month = new Date(updatedAt).getMonth();
    let day = new Date(updatedAt).getDay();
    return `${day}/${month}/${year} ${dateToConvert}`;
  };

  let advertDate = convertDate(updatedAt);

  return (
    <Card>
      <CardHeader
        titleTypographyProps={{ variant: "h6" }}
        className="advert-card-header"
        avatar={
          <Avatar className="advert-card-for-sale" aria-label="for-sale">
            {forSale ? (
              <span className="sale">Sale</span>
            ) : (
              <span className="buy">Buy</span>
            )}
          </Avatar>
        }
        title={name}
        subheader={
          <div className="advert-card-info">
            <div className='date'>{`Last update: ${advertDate}`}</div>
            <div className="sub-info">
              {!match.params.username && 
                <Fragment>
                  <span>By: </span>
                  <div className="owner"onClick={() => onRouteUserPublic(owner)}>{`${owner}`}</div>
                </Fragment>
              }
            </div>
            <div className="price">$ {price}</div>
          </div>
        }
      />

      <CardMedia className="advert-card-media" image={photo} title={name} />
      {/* <img src={photo} alt={name} /> */}
      <CardContent>
        <Typography gutterBottom variant="h6" component="h2">
          Description
        </Typography>
        <Typography
          variant="body2"
          color="textSecondary"
          component="p"
          className="truncate"
        >
          {description}
        </Typography>
        <div className="advert-card-tags">
          {tags.map((tag, i) => (
            <Chip key={i} label={tag} />
          ))}
        </div>
      </CardContent>
      <CardActions className='advert-card-actions'>
        <Button
          variant="contained"
          className="btn-accent"
          onClick={() => onRouteAdvertDetail(name, id)}
        >
          Detail
        </Button>
        <TwitterShareButton
          url={`${window.location.href}advert/${urlName}_id__${id}`}
          options={{ text: "#wallaclone" + name, via: "wallaclone" }}
        />
      </CardActions>
    </Card>
  );
};

const mapStateToProps = state => {
  return {
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onRouteAdvertDetail: (name, id) =>
      dispatch(actions.routeAdvertDetail({ name, id })),
    onRouteUserPublic: (owner) =>
      dispatch(actions.routeUserPublic({ owner })),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(AdvertCard));
