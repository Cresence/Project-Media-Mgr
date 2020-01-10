import React from "react";
import { Link } from "react-router-dom";
import { useAuth0 } from "../../react-auth0-wrapper";

function Navadmin() {
  const { isAuthenticated } = useAuth0();
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
          <li><Link to="/profile"><i className="fas fa-tasks"></i> Manage Main-Page Slider (Placeholder)</Link></li>
          <li><Link to="/admin/news"><i className="fas fa-newspaper"></i> Managa Posts</Link></li>
         
        </ul>
    </div>
    )
    }
    </>
  );
}

export default Navadmin;
