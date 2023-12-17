import React from 'react'
import {Link, Navigate, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const Landing = (props) => {
  const {isAuthenticated,loading}=props;
  const navigate=useNavigate();
  if(isAuthenticated){
    navigate('/dashboard');
  }
  return (
    <div>
      <section className="landing">
      <div className="dark-overlay">
        <div className="landing-inner">
          <h1 className="x-large">DevBook</h1>
          <p className="lead">
            Create a developer profile/portfolio, share posts and get help from
            other developers
          </p>
          <div className="buttons">
            <Link to="/register" className="btn btn-primary">Sign Up</Link>
            <Link to="/login" className="btn btn-light">Login</Link>
          </div>
        </div>
      </div>
    </section>
    </div>
  )
}

Landing.propTypes={
  isAuthenticated:PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired
  }

  const mapStateToProps = (state) =>({
    isAuthenticated : state.authReducer.isAuthenticated,
    loading : state.authReducer.loading
  });

export default connect(mapStateToProps)(Landing)
