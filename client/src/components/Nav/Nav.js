import React from "react";
import { Link } from "react-router-dom";
import { useAuth0 } from "../../react-auth0-spa"

const Nav = () => {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();
    return (
      <>
    <div className="container">
  <br/>
  <div className="row">
    <div className="col-sm-8"> 
        <Link id="logo" to="/">
        {/* <h1>H.N.I.C.</h1> */}
        <img id="logo" src="./pub_assets/images/Banner_Logo.jpg" width="200px" alt="Logo"/>
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
          <Link className="nav-link" to="/api/all">Data.JSON</Link>
        </li>    
      </ul>
      <ul className="navbar-nav ml-auto">
        <li className="nav-item"> 
          {!isAuthenticated && (
            <Link className="nav-link" to="#" onClick={() => loginWithRedirect({})}>Sign Up / Log in</Link>
          )}
      </li>
      
      <li className="nav-item"> 
      {isAuthenticated && <Link to="#" className="nav-link" onClick={() => logout()}>Log out</Link>}
      </li>
      </ul>
    </div>
  </div>  
</nav>
</>
    )
}

export default Nav;