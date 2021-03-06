import React from "react";
import { Link } from "react-router-dom";
import "./style.css";

function MovieCard(props){

    const { Poster, Plot, Title, imdbID } = props;

    return(
            <div className="image-box col-sm-12 col-md-8 py-5">
                <div className="poster-box">
                    <img src={Poster ? Poster : "https://placehold.it/128x197?text=No%20Preview"} alt={`Article: ${Poster}`} />
                </div>
                <p className="hover-description">
                    <span>{Plot}</span>
                </p>
                <h5><strong>{Title}</strong></h5>
                <Link to={"/posts/" + imdbID} id={imdbID} className="btn btn-theme more-detail">
                    More Detail
                </Link>
                {/* <Link id={imdbID} to="#" onClick={() => console.log ("Saved")} className="btn btn-theme save-movie">Save Movie</Link> */}
            </div>
    )
}

export default MovieCard;