import React, { Fragment } from "react";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import { Button } from "@material-ui/core";
import "./AdvertCard.css";


const AdvertCard = props => {
  const {
    name,
    description,
    price,
    type,
    photo,
    tags,
    createdAt,
    updatedAt,
    forSale
  } = props;

  let date = new Date(updatedAt).toUTCString();
  
  return (
    <Card>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe">
            {forSale ? <Fragment>Sale</Fragment> : <Fragment>Buy</Fragment>}
          </Avatar>
        }
        title={name}
        subheader={date}
      />
      <CardMedia className="advert-card-media" image={photo} title={name} />
      {/* <img src={photo} alt={name} /> */}
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {description}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <Button variant="contained" className="btn-accent">Detail</Button>
      </CardActions>
    </Card>
  );
};

export default AdvertCard;
