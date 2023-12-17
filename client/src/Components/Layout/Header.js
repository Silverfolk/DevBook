import React,{Fragment} from 'react'
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';
const Header = (props) => {
  const {auth:{isAuthenticated,loading},logout} = props;

  const authLinks = (
    <ul>
        <li>
            <Link to='/profiles'>
                <span>Developers</span>
            </Link>
        </li>
        <li>
            <Link to='/posts'>
                <span>Posts</span>
            </Link>
        </li>
        <li>
            <Link to='/dashboard'>
                <i className='fa fa-user'></i>{' '}
                <span className='hide-sm'>Dashboard</span>
            </Link>
        </li>
        <li>
            <Link onClick={logout} to='#!'>
                <i className='fas fa-sign-out-alt'></i>{' '}
                <span className='hide-sm'>Logout</span>
            </Link>
        </li>
    </ul>
);

const guestLinks = (
    <ul>
        <li>
            <Link to='/profiles'>
                <span>Developers</span>
            </Link>
        </li>
        <li>
            <Link to='/register'>Register</Link>
        </li>
        <li>
            <Link to='/login'>Login</Link>
        </li>
    </ul>
);
  return (
    <div>
      <nav className="navbar bg-dark">
      <h1>
        <a href="index.html"><i className="fas fa-code"></i> DevBook</a>
      </h1>
      {!loading && (
                <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
            )}
    </nav>
    </div>
  )
}

  Header.propTypes={
  logout: PropTypes.func.isRequired,
  authenticated: PropTypes.object.isRequired,
  }
const mapStateToProps = (state) =>({
  auth:state.authReducer
});

export default connect(mapStateToProps,{logout})(Header);
