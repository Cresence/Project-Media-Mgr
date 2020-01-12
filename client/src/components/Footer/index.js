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
    <footer className="footer">
      <div className="container">
        {/* <h1>Ad Here</h1> */}
        <p data-toggle="tooltip" title="Website Created By Devon Harris">Head Nerds In Charge © Copyright {year}</p>
      </div>
    </footer>
  );
}

export default Footer;
