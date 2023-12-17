import React,{Fragment,useEffect} from 'react'
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { getCurrentProfile } from '../../actions/profile';
import Spinner from '../Layout/Spinner';
import DashboardActions from './DashBoardActions';
import Education from './Education';
import Experience from './Experience';
import { Link } from 'react-router-dom';
import { deleteAccount } from '../../actions/profile';

const DashBoard = (props) => {
    const{auth:{user},profile:{profile, loading},getCurrentProfile,deleteAccount}=props;
    useEffect(()=>{
     getCurrentProfile();
    },[]);
     
    return loading && profile === null ? (
      <Spinner />
  ) :(<Fragment>
    <h1 className='large text-primary'>Dashboard</h1>
    <p className='lead'>
        <i className='fas fa-user'></i> Welcome {user?.firstName +' '+ user?.lastName}
        
    </p>
    {profile !== null ? (
        <Fragment>
            <DashboardActions />
            <Experience experience={profile.experience} />
            <Education education={profile.education} />
            <div className='my-2'>
                <button
                    className='btn btn-danger'
                    onClick={() => deleteAccount()}
                >
                    <i className='fas fa-user-minus'></i> Delete my
                    Account
                </button>
            </div>
        </Fragment>
    ) : (
        <Fragment>
            <p>
                You have not yet setup a profile, please add some info
            </p>
            <Link to='/create-profile' className='btn btn-primary my-1'>
                Create Profile
            </Link>
        </Fragment>
    )}
</Fragment>)
}

DashBoard.propTypes={
    getCurrentProfile: PropTypes.func.isRequired,
    auth:PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
    deleteAccount: PropTypes.func.isRequired
};

const mapStateToProps=state => ({
    auth:state.authReducer,
    profile:state.profile
})


export default connect(mapStateToProps,{getCurrentProfile,deleteAccount})(DashBoard);
