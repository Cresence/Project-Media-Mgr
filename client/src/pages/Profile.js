// src/components/Profile.js
import React from "react";
import { useAuth0 } from "../react-auth0-wrapper.js";
import Loading from "../components/Loading/Loading"

const Profile = () => {
  const { loading, user } = useAuth0();

  if (loading || !user) {
    return (
      <Loading />
    );
  }

  return (
    <div>
    <div className="container-fluid">
      <div  className="row admin-content-box py-5">
        <div className="col-sm-12">
          <div className="profile-box text-center">
            <img src={user.picture ? user.picture : null} alt="Profile" />
          
          <h2 className="text-color-blue">{user.name}</h2>
          <h6>{user.email === user.name ? null : <p>{user.email}</p>}</h6>
          </div>
      </div>
      </div>
    </div>
    </div>
  );
};

export default Profile;