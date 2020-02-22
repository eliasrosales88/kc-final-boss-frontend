import React from "react";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import { Button, Chip } from "@material-ui/core";
import * as actions from "../../store/actions";
import "./AdvertCard.css";
import { connect } from "react-redux";

const AdvertCard = props => {
  const {onRouteAdvertDetail} = props;
  const {
    id,
    name,
    description,
    price,
    photo,
    tags,
    createdAt,
    updatedAt,
    forSale,
    owner
  } = props;

  const convertDate = updatedAt => {
    let dateToConvert = new Date(updatedAt).toLocaleTimeString();
    return `${dateToConvert}`;
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
          <div  className="advert-card-info">
            <div>{`Last update: ${advertDate}`}</div>
            <div className='sub-info'>
            <span>By: </span><div className='owner'>{`${owner}`}</div>
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
        <Typography variant="body2" color="textSecondary" component="p" className='truncate'>
          {description}
        </Typography>
        <div className="advert-card-tags">
          {tags.map((tag, i) => (
            <Chip key={i} label={tag} />
          ))}
        </div>
      </CardContent>
      <CardActions disableSpacing>
        <Button variant="contained" className="btn-accent" onClick={() => onRouteAdvertDetail(name, id)}>
          Detail
        </Button>
      </CardActions>
    </Card>
  );
};

const mapStateToProps = state => {
  return {
    // adverts: getAdverts(state),
    // paginatorCount: getPaginatorCount(state)
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onRouteAdvertDetail: (name, id) => dispatch(actions.routeAdvertDetail({name, id}))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AdvertCard);
