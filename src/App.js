import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './App.css';
import React from "react";
import Home from "./Components/Home.js"
import SignIn from './Components/SignIn';
import WelcomeDashboard from './Components/WelcomeDashboard';
import store from './store';
import { Provider } from 'react-redux';
import SignUp from './Components/SignUp';
import ProfileEdit from './Components/Profile/ProfileEdit';
import EditMovie from './Components/Movie/EditMovie';
import PrivateRoute from './auth/PrivateRoute';

function App() {
  return (
        <Provider store={store}>
               <Router>
                   <Routes>
                        <Route exact path="/" element={<WelcomeDashboard/>}/> 
                       <Route exact path="/home" element={<PrivateRoute><Home/></PrivateRoute>}/>
                       <Route exact path="/signup" element={<SignUp/>}/>
                       <Route exact path="/profile" element={<PrivateRoute><ProfileEdit/></PrivateRoute>}/>
                       <Route path="/movies/:movieId" component={EditMovie} />
                       <Route path="*" element={<NotFound/>}/>
                      {/*  <Route path="/adminSignIn" element={<AdminSignIn/>}/>*/}
                   </Routes>
               </Router>
               </Provider>
  );
}

export default App;


function NotFound() {
    return <h2>404- no page found</h2>;
}