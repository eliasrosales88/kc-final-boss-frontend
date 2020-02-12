import React, { Fragment } from "react";
import { Button, Container } from "@material-ui/core";

/**
 * FixedContainer
 */
export default function Main({ containerClassName, children, sectionTitle }) {
  return (
    <Fragment>
      <Container className={containerClassName}>
      {sectionTitle &&
      <h2>{sectionTitle}</h2>
      }
     
        {children}
      </Container>
    </Fragment>
  );
}
