import React from "react";
import { Link } from "react-router-dom";
import "./style.css";

function MovieCard(props){

    const { Poster, Plot, Title, imdbID } = props;

    return(
            <div className="image-box col-sm-6 col-md-3">
                <div className="poster-box">
                    <img src={Poster +  "onerror=\"this.onerror=null;   this.src='../imagenot-found.png';\"/"} alt={`Movie Poster: ${Poster}`} />
                </div>
                <p className="hover-description">
                    <span>{Plot}</span>
                </p>
                <h5>{Title}</h5>
                <Link to={"/posts/" + imdbID} id={imdbID} className="btn btn-theme more-detail">
                    More Detail
                </Link>
                {/* <Link id={imdbID} to="#" onClick={() => console.log ("Saved")} className="btn btn-theme save-movie">Save Movie</Link> */}
            </div>
    )
}

export default MovieCard;