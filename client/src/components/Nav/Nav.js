import React from "react";
import { useAuth0 } from "../../react-auth0-wrapper";
import { Link } from "react-router-dom";
import logo from "../../assets/Banner_Logo.jpg";
import "./style.css"
// import auth0Client from "../../Auth";

const Nav = (props) => {
  const { isAuthenticated, loginWithRedirect, logout, handleRedirectCallback } = useAuth0();

  const logoutWithRedirect = () =>
    logout({
      returnTo: window.location.origin
    });

  // const signOut = () => {
  //   auth0Client.signOut();
  //   props.history.replace('/');
  // }
  
    return (
      <>
    <div className="container">
  <br/>
  <div className="row">
    <div className="col-sm-8"> 
        <Link id="logo" to="/">
        {/* <h1>H.N.I.C.</h1> */}
        <img id="logo" src={logo} width="200px" alt="Logo"/>
        </Link>
      <br />
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
          <Link className="nav-link" to="/posts">Posts</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/#">Videos Archive</Link>
        </li>
      </ul>
      <ul className="navbar-nav ml-auto">
        <li className="nav-item"> 
          {!isAuthenticated && (
            <Link className="nav-link" to="#" onClick={() => loginWithRedirect({})}>Sign Up / Log in</Link>
          )}
      </li>
      
      {isAuthenticated && (
        <>
          <li className="nav-item dropdown">
            <Link className="nav-link dropdown-toggle" to="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              User Options
            </Link>
            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
              <Link className="dropdown-item" to="/profile">Profile</Link>
              <Link className="dropdown-item" to="#">Manage Front-Page Sliders</Link>
              {/* <div className="dropdown-divider"></div> */}
              <Link className="dropdown-item" to="/admin/news">Manage Posts</Link>
            </div>
          </li>
          <li className="nav-item">
            <Link to="#" className="nav-link" onClick={() => logoutWithRedirect()}>Log out</Link>
          </li>
        </>
          )}

      </ul>
    </div>
  </div>  
</nav>
</>
    )
}

export default Nav;