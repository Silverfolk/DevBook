import React, { useState } from 'react';
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alert';//action importing 
import {register} from '../../actions/auth';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
const Register = (props) => {
  const {setAlert,register,isAuthenticated}=props;
  const navigate=useNavigate();
  const [formdata,Setformdata]=useState({
    firstName:'',
    lastName:'',
    username:'',
    email:'',
    password:'',
    passwordConfirm:''
  });
  
 
  const {firstName,lastName,username,email,password,passwordConfirm} =formdata;
  // console.log(formdata);
  const inputHandler = (e) =>{
Setformdata({...formdata,[e.target.name]:e.target.value})
  }
  const SubmitHandler=(e)=>{
    e.preventDefault();
    if(password!==passwordConfirm) {
     setAlert("password do not match ",'danger');
    }
    else{
      console.log(formdata);
      register({firstName,lastName,username,email,password});
      navigate('/login');
    }
  }
  // if(isAuthenticated){
  //   navigate('/dashboard');
  // }

  return (
    <>
       <section className="container">
      <h1 className="large text-primary">Sign Up</h1>
      <p className="lead"><i class="fa-regular fa-user"></i>Create Your Account</p>
      <form className="form" action="create-profile.html" onSubmit={SubmitHandler}>
      <div className="form-group">
          <input type="text" placeholder="Firstname" value={firstName} onChange={inputHandler} name="firstName" required  />
        </div>
        <div className="form-group">
          <input type="text" placeholder="LastName" value={lastName} onChange={inputHandler} name="lastName" required   />
        </div>
        <div className="form-group">
          <input type="text" placeholder="Name" value={username} onChange={inputHandler} name="username"  required  />
        </div>
        <div className="form-group">
          <input type="email" placeholder="Email Address" value={email} onChange={inputHandler} name="email"  required  />
          <small className="form-text"
            >This site uses Gravatar so if you want a profile image, use a
            Gravatar email</small
          >
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            minLength="6"
            onChange={inputHandler}
            value={password}
            required 
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Confirm Password"
            name="passwordConfirm"
            minLength="6"
            onChange={inputHandler}
            value={passwordConfirm}
            required 
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Register" />
      </form >
      <p className="my-1">
        Already have an account? <a href="login.html">Sign In</a>
      </p>
    </section>
    </>
  )
}
Register.propTypes={
setAlert: PropTypes.func.isRequired,
register: PropTypes.func.isRequired,
isAuthenticated:PropTypes.bool.isRequired
}

const mapStateToProps = (state) =>({
    isAuthenticated : state.authReducer.isAuthenticated
  });

export default connect(mapStateToProps,{setAlert,register})(Register);
