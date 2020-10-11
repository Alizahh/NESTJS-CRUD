import React from 'react';
import './App.css';
import { Link } from 'react-router-dom';
import RouterConfig from './route.js';
import axios from 'axios';
import {useHistory} from "react-router-dom"

 const App = ()=> {
  const history = useHistory()
  const logoutHandler = () => {
    axios.get(`http://localhost:5000/logout`).then(response => {
      if (response.status === 200) {
        history.push("/login");
      } else {
        alert('Log Out Failed')
      }
    });
  };
  return (
    <div className="App">
         <nav className="navbar bg-dark navbar-expand-lg navbar-dark">
    <ul className="navbar-nav mr-auto">
      <li className="navbar-item">
        <Link to="/list" className="nav-link">list of Blogs</Link>
      </li> 
      <li className="navbar-item">
        <Link to="/list" className="nav-link">Blog edit</Link>
      </li> 
     <li className="navbar-item">
        <Link to="/create" className="nav-link">Create Blogs</Link>
      </li> 
      <li className="navbar-item">
        <Link to="/login" className="nav-link">Login</Link>
      </li>
      <li className="navbar-item">
        <Link to="/signup" className="nav-link">Signup</Link>
      </li>
      <li>
      <button className="btn btn-danger" onClick={logoutHandler}>Logout</button>
      </li>
    </ul>
  </nav>
      <RouterConfig />
    </div>
  );
}

export default App;

