import React, { Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { Button } from "@material-ui/core";
import "./AdvertCard.css";
// expand: {
//   transform: 'rotate(0deg)',
//   marginLeft: 'auto',
//   transition: theme.transitions.create('transform', {
//     duration: theme.transitions.duration.shortest,
//   }),
// },
// expandOpen: {
//   transform: 'rotate(180deg)',
// },

const AdvertCard = props => {
  const {
    name,
    description,
    price,
    type,
    photo,
    tags,
    createdAt,
    forSale
  } = props;

  console.log("photo", photo);
  
  return (
    <Card>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe">
            {forSale ? <Fragment>Sale</Fragment> : <Fragment>Buy</Fragment>}
          </Avatar>
        }
        title={name}
        subheader={createdAt}
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
