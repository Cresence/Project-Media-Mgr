import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const movies = [
    "The Matrix",
    "The Notebook",
    "Mr. Nobody",
    "The Lion King",
    "Avenger",
    "Star Wars",
    "Hostel",
    "300",
    "Creed",
    "Fight Club",
    "Tangled",
    "Night out"
  ];

  const result = () => {
    for (let i = 0; i < movies.length; i++) {
      let queryURL =
      "https://www.omdbapi.com/?t=" + movies[i] + "&apikey=trilogy";

       return axios.get(queryURL)
  }

function Test() {
    for (let i = 0; i < movies.length; i++) {
        let queryURL =
        "https://www.omdbapi.com/?t=" + movies[i] + "&apikey=trilogy";

         return axios.get(queryURL)
            .then(response => {
                const result = <div>
                    <div className="image-box col-sm-6 col-md-3">
                        <div className="poster-box">
                            <img src={response.Poster +  "' onerror=\"this.onerror=null;this.src='../images/not-found.png';\"/"} alt={`Movie Poster: ${response.Poster}`} />
                        </div>
                        <p className="hover-description">
                            <span>{response.Plot}</span>
                           </p>
                        <h5>{response.Title}</h5>
                        <Link to="/detail" id={response.imdbID} className="btn btn-theme more-detail">
                            More Detail
                        </Link>
                        <Link id={response.imdbID} to="#" onClick={() => console.log("Saved")}>Save Movie</Link>
                    </div>
                </div>
                
            console.log(result)}
            )
        }
    }

export default Test