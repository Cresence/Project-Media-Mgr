// src/components/Profile.js
// import Navadmin from '../components/Navadmin/index'
import React from "react";
import { useAuth0 } from "../react-auth0-wrapper.js";

// var keys = require('../keys');


const Profile = () => {
  const { loading, user } = useAuth0();

  if (loading || !user) {
    return (
      <div>Loading...</div>
    );
  }

//   let adminBar = (keys) =>{
//     return keys.map(e => {
//       if (user.email === e) {
//         return <Navadmin />
//       } else {
//         return null
//       }
//     });
// };

  console.log(user);

  return (
    <div>
    {/* {adminBar(keys.adminEmail.id)} */}
    <div className="container-fluid">
      <div  className="row admin-content-box py-5">
        <div className="col-sm-12">
          <div className="profile-box text-center">
            <img src={user.picture} alt="Profile" />
          
          <h2 className="text-color-blue">{user.name}</h2>
          <h6>{user.email === user.name ? null : <p>{user.email}</p>}</h6>
          {/* <code>{JSON.stringify(user, null, 2)}</code> */}
          </div>
      </div>
      </div>
    </div>
    </div>
  );
};

export default Profile;