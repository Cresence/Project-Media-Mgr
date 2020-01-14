import React from "react";
import "./style.css";


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
    <footer className="footer mt-auto py-3">
      <div className="container">
        {/* <h1>Ad Here</h1> */}
        <p>We are HNIC, Head Nerds in Charge... your new favorite Nerd and Blerd talk Web show. Highlighting everything in pop &amp; geek culture from the black perspective</p>
        <h5 data-toggle="tooltip" title="Website Created By Devon Harris">Head Nerds In Charge &copy; Copyright {year}</h5>
      </div>
    </footer>
  );
}

export default Footer;
