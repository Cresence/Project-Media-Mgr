import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import API from "../utils/API"

class Detail extends Component {

    state = {
        post: {}
    };

    componentDidMount() {
        this.loadData()
    }

    // Get individual data (Placeholder Content)
    // getMovieData = () => {
    
    //         let queryURL =
    //       "https://www.omdbapi.com/?i=" + this.props.match.params.id + "&apikey=trilogy"
    
    //         axios.get(queryURL)
    //             .then(result => this.setState({ post: result.data }))
    //             .catch(err => console.log(err));
    
    //     };

    loadData = () => {
        API.getPost(this.props.match.params.id)
            .then(res => this.setState({ post: res.data }))
            .catch(err => console.log("Error loading database... \n" + err))
    }

    render() {
        const { news_title, category, description, news_body, image_url, author, author_photo, date, video_src } = this.state.post;
        const styles = {
            imgStyleSm: {
                width: "250px",
                height: "‭250px",
                marginBottom: "5%"
              }        
        }

        return(
                <>
                <div id="home">
                    <br />
                    <div className="container outer-box">
                        <div className="movie-detail">
                            <div className="img-box">
                                <img src={image_url} className="img-fluid" onError={this.src='../images/not-found.png'} />
                            </div>
                            <br />
                            <div className="movie-description">
                                <h2>{news_title}</h2>
                                {/* <Link to="#" data-toggle="modal" data-target="#vidioModal" className="movie-trailer">
                                    <span className="fa fa-play"></span>
                                    Play Trailer
                                </Link> */}
                                <p><strong>Category: </strong>{category}</p>
                                <p><strong>{description}</strong></p>
                                <br />
                                <p>{news_body}</p>
                                <br />
                                <p><strong>Article By: </strong>{author}</p>
                                <img src={author_photo} className="img-fluid" style={styles.imgStyleSm} />
                                {video_src ? <Link to="#" data-toggle="modal" data-target="#vidioModal" className="btn btn-theme">Watch Now</Link> : null}
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
                                <h4 class="text-center">Play Content</h4>
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