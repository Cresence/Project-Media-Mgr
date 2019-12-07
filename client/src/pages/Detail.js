import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

class Detail extends Component {

    state = {
        post: {}
    };

    componentDidMount() {
        this.getMovieData();
    }

    getMovieData = () => {
    
            let queryURL =
          "https://www.omdbapi.com/?i=" + this.props.match.params.id + "&apikey=trilogy"
    
            axios.get(queryURL)
                .then(result => this.setState({ post: result.data }))
                .catch(err => console.log(err));
    
        };

    render() {
        
        const { Poster, Title, Plot, Genre, Released, Rated, imdbRating, Director, Writer, Actors, Website } = this.state.post;

        return(
                <>
                <div id="home">
                    <br />
                    <div className="container outer-box">
                        <div className="movie-detail">
                            <div className="img-box">
                                <img src={Poster} className="img-fluid" onError={this.src='../images/not-found.png'} />
                            </div>
                            <div className="movie-description">
                                <h2>{Title}</h2>
                                {/* <Link to="#" data-toggle="modal" data-target="#vidioModal" className="movie-trailer">
                                    <span className="fa fa-play"></span>
                                    Play Trailer
                                </Link> */}
                                <p><strong>Genre: </strong>{Genre}</p>
                                <p><strong>Released: </strong>{Released}</p>
                                <p><strong>Rated: </strong>{Rated}</p>
                                <p><strong>imdbRating: </strong>{imdbRating}</p>
                                <p><strong>Director: </strong>{Director}</p>
                                <p><strong>Writer: </strong>{Writer}</p>
                                <p><strong>Actors: </strong>{Actors}</p>
                                <Link to="#" data-toggle="modal" data-target="#vidioModal" className="btn btn-theme">Watch Now</Link>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Video Modal Popup */}
                <div class="modal fade show" id="vidioModal" >
                    <div class="modal-dialog modal-lg">
                        <div class="modal-content">
                            {/* Modal body  */}
                            <div class="modal-body">
                                <div class="text-center top-icon">
                                    <span>
                                        <i class="fa fa-play-circle fa-spin-hover" aria-hidden="true"></i>
                                    </span> 
                                </div>
                                <h4 class="text-center">Play Trailer </h4>
                                <div class="trailer-box"></div>
                            </div>
                            {/* Modal footer  */}
                            <div class="modal-footer">
                                <button type="button" class="btn btn-theme close_me" data-dismiss="modal">Close</button>
                            </div>
                        </div>
                    </div>
                </div>
                </>
        )
    }
}

export default Detail