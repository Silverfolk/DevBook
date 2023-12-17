import React, { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { login } from '../../actions/auth';
import { setAlert } from '../../actions/alert';
import { connect } from 'react-redux';
const Login = (props) => {
  const {setAlert,login,isAuthenticated,user}=props;
  const navigate=useNavigate();
  const [formData, SetFormData] = useState({
    email: '',
    password: ''
  });
  const { email, password } = formData;
  const inputHandler = (e) =>
  SetFormData({ ...formData, [e.target.name]: e.target.value });

const onSubmit = (e) => {
  console.log({email, password});
  e.preventDefault();
  login({email,password});
  // navigate('/dashboard');
};
  
// Redirect if Authenticated 
if(isAuthenticated ){
  navigate('/dashboard');
}

  return (
    <section className="container">
      <h1 className="large text-primary">Sign In</h1>
      <p className="lead">
        <i className="fas fa-user" /> Sign Into Your Account
      </p>
      <form className="form" onSubmit={onSubmit}>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            value={email}
            onChange={inputHandler}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={inputHandler}
            minLength="6"
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Login" />
      </form>
      <p className="my-1">
        Don't have an account? <Link to="/register">Sign Up</Link>
      </p>
    </section>
  );
}


Login.propTypes={
  setAlert: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired,
  isAuthenticated:PropTypes.bool.isRequired,
  user:PropTypes.object.isRequired
  }

  const mapStateToProps = (state) =>({
    isAuthenticated : state.authReducer.isAuthenticated,
    user:state.user
  });
  
  export default connect(mapStateToProps,{setAlert,login})(Login);