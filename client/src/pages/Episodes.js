// Dependencies

import React, { Component } from "react";
// import { Link } from "react-router-dom";
import axios from "axios";
import MovieCard from "../components/MovieCard/MovieCard"

// Predefined methods to call from local database

// import API from "../utils/API";



// const displayMovieElements = movieData => {
//     return movieData.forEach(e => {
//         const { Poster, Plot, imdbID, Title } = e;

//         <> 
//             <div className="image-box col-sm-6 col-md-3">
//                 <div className="poster-box">
//                     <img src={Poster +  "onerror=\"this.onerror=null;this.src='../imagenot-found.png';\"/"} alt={`Movie Poster:{response.Poster}`} />
//                 </div>
//                 <p className="hover-description">
//                     <span>{Plot}</span>
//                    </p>
//                 <h5>{Title}</h5>
//                 <Link to="/detail" id={imdbID} className="btbtn-theme more-detail">
//                     More Detail
//                 </Link>
//                 <Link id={imdbID} to="#" onClick={() => console.log("Saved")}>Save Movie</Link>
//             </div>
//         </>
//     });
// }



class Episodes extends Component {

    state = {
        movieData: [],

        movies: [
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
            "Night out"],

        
    };


componentDidMount() {
    this.getMovieData()
}
  // API call using predefined inquiry, returns responses as array of objects
  getMovieData = () => {
    
    this.state.movies.map((e, i) => {
        let queryURL =
      "https://www.omdbapi.com/?t=" + this.state.movies[i] + "&apikey=trilogy"

        axios.get(queryURL)
            .then(result => this.setState({ movieData: [...this.state.movieData, result.data] }));

            return e;
    });
       
  }

  // Render of React Components/Page
    render(){
        return (
                    <div id="home">
                        <div className="container outer-box">
                            <div className="row">
                                <div className="col-12">
                                    <h1     className="top-heading">Placeholder Heading</h1>
                                </div>
                            </div>
                            <div className="row movie_box">
                                <div>
                                    {/* Takes array of objects as arguments and convers them to JSX elements */}

                                        {this.state.movieData.map(element => (
                                        <MovieCard
                                        Title={element.Title}
                                        imdbID={element.imdbID}
                                        Plot={element.Plot}
                                        Poster={element.Poster}
                                        key={Math.floor(Math.random() *         10000000)}
                                        />
                                        ))}
                                    </div>
                            </div>
                        </div>
                    </div>
        )
    }
}

export default Episodes;