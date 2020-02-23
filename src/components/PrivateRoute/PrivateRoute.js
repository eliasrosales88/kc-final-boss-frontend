import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import { getToken } from '../../store/selectors';

const PrivateRoute = ({ authorized, ...props }) =>
  authorized !== null ? <Route {...props} /> : <Redirect to="/register" />;


  
  const mapStateToProps = state => ({
    authorized: getToken(state),
  });
  
  export default connect(mapStateToProps)(PrivateRoute);
