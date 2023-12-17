import './App.css';
import Header from './Components/Layout/Header';
import Landing from './Components/Layout/Landing';
import Login from './Components/Authentication/Login'
import Register from './Components/Authentication/Register';
import DashBoard from './Components/DashBoard/DashBoard';
import PrivateRoute from './Components/Routes/PrivateRoute';
import CreateProfile from './Components/Profile-Form/CreateProfile';
import EditProfile from './Components/Profile-Form/EditProfile';
import AddEducation from './Components/Profile-Form/AddEducation';
import AddExperience from './Components/Profile-Form/AddExperience';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Alert from '../src/Components/Layout/Alert';
import { loadUser } from './actions/auth';
// Redux
import { Provider } from 'react-redux';
import store from './store';
import { Fragment, useEffect } from 'react';
import Profiles from './Components/Profiles/Profile';
import Profile from './Components/Profile/Profile'
import Posts from './Components/Posts/Posts';
import Post from './Components/Post/Post';
function App() {
useEffect(()=>{
//store is present here so we don't need to use connect() here 
store.dispatch(loadUser());
},[]);

  return (
    <Provider store={store}>
    <Router >{/* Wrap your routes with the Router component */}
     <>
      <Header/>
      <Routes>
        <Route exact path='/' element={<Landing/>} />
      </Routes>
        <div className="container">
          <Alert/>
        <Routes>
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/profiles" element={<Profiles/>} />
        <Route path="/profile/:id" element={<Profile/>} />
        <Route element={<PrivateRoute/>}>
        <Route path="/dashboard" element={<DashBoard/>} />
        <Route path="/create-profile" element={<CreateProfile/>} />
        <Route path="/edit-profile" element={<EditProfile/>} />
        <Route path="/add-education" element={<AddEducation/>} />
        <Route path="/add-experience" element={<AddExperience/>} />
        <Route path="/posts" element={<Posts/>} />
        <Route path="/posts/:id" element={<Post/>} />
        </Route>
       
        </Routes>
        </div>
        </>
      </Router>
      </Provider>
  );
}

export default App;
