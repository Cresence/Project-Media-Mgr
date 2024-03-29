import React from "react";
import { useAuth0 } from "../../react-auth0-wrapper";
import { Link } from "react-router-dom";
// import logo from "../../assets/Banner_Logo.jpg";
import "./style.css"
const socialMedias = ["https://www.facebook.com", "https://www.twitter.com", "https://instagram.com/", "https://www.youtube.com", "https://www.twitch.tv/"];
const blankObjectSite = "#";

const Nav = (props) => {
  const { isAuthenticated, loginWithRedirect, logout, user } = useAuth0();

  const logoutWithRedirect = () =>
    logout({
      returnTo: window.location.origin
    });

    const userLevel = user ? user["https://dev-2pm3nnjy.com/app_metadata"].roles[0] : null

    return (
        <>
    <div className="container">
      <br/>
      <div className="row">
        <div className="col"> 
          <Link id="logo" to="/">
          {/* <img id="logo" src={logo} width="230px" alt="H.N.I.C Logo"/> */}
          <h3>Your Website Logo Here</h3>
          </Link>
        </div>
        <div className="col align-self-end"> 
        <a id="shop-btn" className="btn btn-theme more-posts float-right" target="_blank" rel="noopener noreferrer" title="Store" href={ blankObjectSite }>Shop Now</a>
        </div>
    </div>
    <div className="row">
        <div className="col">
          <ul className="list-inline social-media-link">
            <li className="list-inline-item">
              <p><a href={ socialMedias[0] } target="_blank" rel="noopener noreferrer" title="Facebook"><i className="fab fa-facebook-square" aria-hidden="true"></i><span style={{display: "none"}}>_blank</span></a></p>
            </li>
            <li className="list-inline-item">
              <p><a href={ socialMedias[1] } target="_blank" rel="noopener noreferrer" title="Twitter"><i className="fab fa-twitter" aria-hidden="true"></i><span style={{display: "none"}}>_blank</span></a></p>
            </li>
            <li className="list-inline-item">
              <p><a href={ socialMedias[2] } target="_blank" rel="noopener noreferrer" title="Instagram"><i className="fab fa-instagram" aria-hidden="true"></i><span style={{display: "none"}}>_blank</span></a></p>
            </li>
            <li className="list-inline-item">
              <p><a href={ socialMedias[3] } target="_blank" rel="noopener noreferrer" title="Youtube"><i className="fab fa-youtube" aria-hidden="true"></i><span style={{display: "none"}}>_blank</span></a></p>
            </li>
            <li className="list-inline-item">
              <p><a href={ socialMedias[4] } target="_blank" rel="noopener noreferrer" title="Twitch"><i className="fab fa-twitch" aria-hidden="true"></i><span style={{display: "none"}}>_blank</span></a></p>
            </li>
            </ul>
        </div>
          <div className="col align-self-end">
              {!isAuthenticated && (
                <Link className="btn btn-theme more-posts float-right" to="#" style={{marginBottom: "2rem"}} onClick={() => loginWithRedirect({})}>Sign Up / Log in</Link>
              )}

            {isAuthenticated && (
              <>
                  <Link to="#" className="btn btn-theme more-posts float-right" style={{marginBottom: "2rem"}} onClick={() => logoutWithRedirect()}>Log out</Link>
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
            {isAuthenticated && userLevel === 'admin' ? (
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
                  </div>
                </li>
              </>
            ) : isAuthenticated ? (
              <>
                <li className="nav-item dropdown">
                  <Link className="nav-link dropdown-toggle" to="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    User Options
                  </Link>
                  <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                    <Link className="dropdown-item" to="/profile">Profile</Link>
                    <div className="dropdown-divider"></div>
                  </div>
                </li>
              </>
            ) : null}

        {/* {isAuthenticated && (
              <>
                <li className="nav-item dropdown">
                  <Link className="nav-link dropdown-toggle" to="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    User Options
                  </Link>
                  <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                    <Link className="dropdown-item" to="/profile">Profile</Link>
                    <div className="dropdown-divider"></div>
                  </div>
                </li>
              </>
            )} */}

          </ul>
          <br />
        </div>
      </div>  
    </nav>
    </>
  )
}

export default Nav;