import React from 'react'
import { Outlet, Navigate} from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
const PrivateRoute = ({auth,children}) => {
    const {isAuthenticated,loading}=auth;
      return (
        isAuthenticated ?<Outlet/>:<Navigate to ='/login'/>
      )

};

PrivateRoute.propTypes={
    auth: PropTypes.object.isRequired
    }
  
    const mapStateToProps = (state) =>({
      auth: state.authReducer
    });
    
 export default connect(mapStateToProps)(PrivateRoute);


