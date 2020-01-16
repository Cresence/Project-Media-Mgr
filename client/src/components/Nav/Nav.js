import React from "react";
import { useAuth0 } from "../../react-auth0-wrapper";
import { Link } from "react-router-dom";
import logo from "../../assets/Banner_Logo.jpg";
import "./style.css"
// import auth0Client from "../../Auth";

const Nav = (props) => {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();

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
        <img id="logo" src={logo} width="230px" alt="H.N.I.C Logo"/>
        </Link>
      <br />
    </div>
    <div className="col-sm-4">
      <div className="input-group">
        {/* <form className="form-inline"> */}
          <input type="text" className="form-control" id="search-input" placeholder="Search here..." />
            <button className="search-movie" type="submit">
            <Link to="/"><i className="fa fa-search" aria-hidden="true" style={{color: "#fff"}}></i></Link>
          </button>
        {/* </form> */}
      </div>
      
    </div>
    <div className="col col-sm-6">
      <ul className="list-inline social-media-link">
        <li className="list-inline-item">
          <p><a href="https://www.facebook.com/Headnerdsincharge/" target="_blank" rel="noopener noreferrer" title="Facebook"><i className="fab fa-facebook-square" aria-hidden="true"></i></a></p>
        </li>
        <li className="list-inline-item">
          <p><a href="https://twitter.com/HeadnerdsinCHRG" target="_blank" rel="noopener noreferrer" title="Twitter"><i className="fab fa-twitter" aria-hidden="true"></i></a></p>
        </li>
        <li className="list-inline-item">
          <p><a href="https://instagram.com/headnerdsincharge" target="_blank" rel="noopener noreferrer" title="Instagram"><i className="fab fa-instagram" aria-hidden="true"></i></a></p>
        </li>
        <li className="list-inline-item">
          <p><a href="https://www.youtube.com/channel/UCoxdiREQMiio1gUoXWE0loA" target="_blank" rel="noopener noreferrer" title="Youtube"><i className="fab fa-youtube" aria-hidden="true"></i></a></p>
        </li>
        <li className="list-inline-item">
          <p><a href="https://www.twitch.tv/headnerdsincharge" target="_blank" rel="noopener noreferrer" title="Twitch"><i className="fab fa-twitch" aria-hidden="true"></i></a></p>
        </li>
        </ul>
    </div>
    <div className="col col-sm-6">
          {!isAuthenticated && (
            <Link className="btn btn-theme more-posts float-right" to="#" onClick={() => loginWithRedirect({})}>Sign Up / Log in</Link>
          )}

        {isAuthenticated && (
          <>
              <Link to="#" className="btn btn-theme more-posts float-right" onClick={() => logoutWithRedirect()}>Log out</Link>
          </>
        )}

    </div>
  </div>
</div>

<nav className="navbar navbar-expand-md bg-dark navbar-dark sticky-top nav-justified nav-fill" id="hdr">
  <div className="container">
    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="collapsibleNavbar">
      <ul className="navbar-nav mr-auto mx-auto">
        <li className="nav-item">
          <Link className="nav-link" to="/articles/categories/Show Archive">Show Archive</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/articles/categories/Conventions">Cons</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/articles/categories/Cosplay-Lifestyle">Cosplay/Lifestyle</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/articles/categories/Gaming">Gaming</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/articles/categories/Entertainment">Entertainment</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/articles/categories/Tech-Science">Tech/Science</Link>
        </li>
        {isAuthenticated && (
          <>
            <li className="nav-item dropdown">
              <Link className="nav-link dropdown-toggle" to="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                User Options
              </Link>
              <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                <Link className="dropdown-item" to="/profile">Profile</Link>
                <div className="dropdown-divider"></div>
                <Link className="dropdown-item" to="/admin/slider">Manage Front-Page Sliders</Link>
                <Link className="dropdown-item" to="/admin/news">Manage Posts</Link>
                <Link className="dropdown-item" to="/external-api">External API</Link>
              </div>
            </li>
          </>
        )}
      </ul>
      <br />
    </div>
  </div>  
</nav>
</>
    )
}

export default Nav;