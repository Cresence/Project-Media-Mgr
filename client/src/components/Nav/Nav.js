import React from "react";
import { Link } from "react-router-dom";

function Nav() {
    return (
      <>
    <div className="container">
  <br/>
  <div className="row">
    <div className="col-sm-8"> 
        <Link id="logo" to="/">
        <h1>HeadNerdsInCharge</h1>
        {/* <img src="images/logo.png" width="150px" alt="Logo"/> */}
        </Link>
      
    </div>
    <div className="col-sm-4">
     
      <div className="input-group">
        <input type="text" className="form-control" id="search-input" placeholder="Search" />
        <button  className="search-movie" type="submit">
        
          <i className="fa fa-search" aria-hidden="true"></i>
        </button>
      </div>
      <br/>
    </div>
  </div>
</div>

<nav className="navbar navbar-expand-md bg-dark navbar-dark sticky-top" id="hdr">
  <div className="container">
    <Link className="navbar-brand" to="/">Home</Link>
    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
    <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="collapsibleNavbar">
      <ul className="navbar-nav mr-auto">
        <li className="nav-item">
          <a className="nav-link" href="/popular" id="episodes">Episodes</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/top_rated" id="top_movi">Top Rated Movies</a>
        </li>    
      </ul>
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <a className="nav-link"  data-toggle="modal" data-target="#signupFormModal">Sign-Up</a>
        </li>
        <li className="nav-item">
          <a className="nav-link"  data-toggle="modal" data-target="#loginFormModal">Login</a>
        </li>    
      </ul>
    </div>
  </div>  
</nav>
</>
    )
}

export default Nav;