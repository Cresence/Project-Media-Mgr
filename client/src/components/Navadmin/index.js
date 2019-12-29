import React from "react";
import { Link } from "react-router-dom";
import { useAuth0 } from "../../react-auth0-wrapper";

function Navadmin() {
  const { user, isAuthenticated, loginWithRedirect, logout } = useAuth0();
  return (
    <>
    {!isAuthenticated && (
        <p>Log-in to see user tools.</p>
      )}
    {
  isAuthenticated && (

    <div className="left-navigationbar">
        <ul>
          <li><Link to="/profile"><i className="fas fa-user"></i>Profile</Link></li>
          {/* <li><Link to="/external-api">External-Api</Link></li> */}
          <li><Link to="/admin/testimonial"><i className="fas fa-tasks"></i> Manage Testimonial</Link></li>
          <li><Link to="/admin/news"><i className="fas fa-newspaper"></i> Manage News</Link></li>
          <li><Link to="/admin/booking"><i className="fas fa-pen"></i> View Booking List</Link> </li>
          {/* <li><a href="/admin"><i className="fas fa-paw"></i> Add Services</a></li> */}
         
        </ul>
    </div>
    )
    }
    </>
  );
}

export default Navadmin;
