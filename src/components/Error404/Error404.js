import React from "react";
import { connect } from "react-redux";
import ErrorImg404 from '../../assets/images/404.svg'
import "./Error404.css";
const Error404 = props => {

  return (
    <div className='error-container'>
      <img className='error' src={ErrorImg404} alt='Not found' />
    </div>
  )
}

const mapStateToProps = state => {
  return {
  };
};
const mapDispatchToProps = dispatch => {
  return {
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Error404);