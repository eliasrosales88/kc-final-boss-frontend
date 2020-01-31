import React, { Fragment } from "react";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";

const Layout = ({mainContainerClassName, children, sectionTitle}) => (
  <Fragment>
    <header>
      <Header />
    </header>
    <main>
      <Main 
        containerClassName={mainContainerClassName} 
        children={children} 
        sectionTitle={sectionTitle} />
    </main>
    <footer>
      <Footer />
    </footer>
  </Fragment>
);

export default Layout;
