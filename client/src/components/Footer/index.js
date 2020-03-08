import React from "react";
import "./style.css";
// import Ad from "../components/Ad/Ad";

function Footer() {
    // date time
    var today = new Date();
    var year = today.getFullYear();
    // var date = today.getFullYear()+''+(today.getMonth()+1)+''+today.getDate();
    // var time = today.getHours() + "" + today.getMinutes() + "" + today.getSeconds();
    // var dateTime = date+''+time;
    // console.log(dateTime);
    // date time end

  return (
    <footer className="footer mt-auto fixed-bottom">
      <div className="container">
        {/* <Ad /> */}
        {/* <a href="https://www.patreon.com/Headnerdsincharge" className="btn btn-theme more-posts" target="_blank" rel="noopener noreferrer" title="Patreon">Support Us</a> */}
        <p>Media Manager is a website template in a blog/media-content allowing users to sign up and login. The administrator can add posts (including video content in an embed format) and edit the header sliders, and posts made (Body content, article photo, tags, video content, etc.) </p>
        <h5 data-toggle="tooltip" title="Website Created Using ReactJS, Express, MongoDB, and NodeJS (MERN Stack)">Devon Harris &copy; Copyright {year}</h5>
      </div>
    </footer>
  );
}

export default Footer;