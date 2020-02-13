import React, { Fragment } from "react";
import { Divider } from "@material-ui/core";
import AdvertCard from "../AdvertCard/AdvertCard";

const Home = (props) => {
return(
  <Fragment>
    <Divider />
    <div>
      <AdvertCard />
    </div>
  </Fragment>
)
}

export default Home;