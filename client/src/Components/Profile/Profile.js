import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import Spinner from '../Layout/Spinner';
import PropTypes from 'prop-types';
import ProfileTop from './ProfileTop';
import ProfileAbout from './ProfileAbout';
import ProfileExperience from './ProfileExperience';
import ProfileGithub from './ProfileGithub';
import ProfileEducation from './ProfileEducation';
import { getProfileById } from '../../actions/profile';
import { Link } from 'react-router-dom';
import { useParams } from "react-router-dom";
const Profile = ({
    getProfileById,
    profile: { profile, loading },
    auth,
    
}) => {
    const params=useParams();
    useEffect(() => {
        getProfileById(params.id);
    }, [getProfileById]);
    console.log(profile);
    return (
        <Fragment>
            {!profile ? (
                <Spinner></Spinner>
            ) : (
                <Fragment>
                    <Link to='/profiles' className='btn btn-light'>
                        Back to Profiles
                    </Link>
                    {auth.isAuthenticated &&
                    auth.loading === false &&
                       auth.user._id === profile?.profile?.user._id && (
                              <Link to='/edit-profile' className='btn btn-dark'>
                                   Edit Profile
                                </Link>
                      )
                    }
                     <div className='profile-grid my-1'>
                        <ProfileTop profile={profile} />
                        <ProfileAbout profile={profile} />
                        <div className='profile-exp bg-white p-2'>
                            <h2 className='text-primary'>Experience</h2>
                            {profile?.profile?.experience?.length > 0 ? (
                                <Fragment>
                                    {profile?.profile?.experience.map((experience) => (
                                        <ProfileExperience
                                            key={experience._id}
                                            experience={experience}
                                        />
                                    ))}
                                </Fragment>
                            ) : (
                                <h4>No experience credentials</h4>
                            )}
                        </div>
                        <div className='profile-edu bg-white p-2'>
                            <h2 className='text-primary'>Education</h2>
                            {profile?.profile?.education.length > 0 ? (
                                <Fragment>
                                    {profile?.profile?.education.map((education) => (
                                        <ProfileEducation
                                            key={education._id}
                                            education={education}
                                        />
                                    ))}
                                </Fragment>
                            ) : (
                                <h4>No education credentials</h4>
                            )}
                        </div>
                        {profile?.profile?.githubusername && (
                            <ProfileGithub username={profile?.profile?.githubusername} />
                        )}
                    </div> 
                </Fragment>
            )}
           
        </Fragment>
    );
};

Profile.propTypes = {
    getProfileById: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    profile: state.profile,
    auth: state.authReducer,
});

export default connect(mapStateToProps, { getProfileById })(Profile);
