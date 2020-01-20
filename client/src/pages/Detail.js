import React, { Component } from "react";
import { Link } from "react-router-dom";
import ReactHtmlParser from 'react-html-parser'; 
// import axios from "axios";
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
            .catch(err => console.log("Error loading database... \n"))
    }

    render() {
        const { news_title, category, description, news_body, image_url, author, author_photo, video_src } = this.state.post;
        const styles = {
            imgStyleSm: {
                width: "250px",
                height: "‭250px",
                marginBottom: "7%"
              }        
        }

        return(
                <>
                <div id="home" className="py-5">
                    <br />
                    <div className="container outer-box">
                        <div className="movie-detail">
                            <div className="img-box">
                                <img src={image_url ? image_url : "https://placehold.it/128x197?text=No%20Preview"} className="img-fluid" alt="Article" />
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
                                <p>{ ReactHtmlParser (news_body) }</p>
                                <br />
                                {video_src ? <Link to="#" data-toggle="modal" data-target="#vidioModal" className="btn btn-theme" style={{marginBottom: "2%"}}>Watch Now</Link> : null}
                                <p><strong>Article By: </strong>{author}</p>
                                <img src={author_photo ? author_photo : "https://placehold.it/128x197?text=No%20Preview"} className="img-fluid" style={styles.imgStyleSm} alt="Author" />
                                <br />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Video Modal Popup */}
                <div className="modal fade show" id="vidioModal" >
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            {/* Modal body  */}
                            <div className="modal-body">
                                <div className="text-center top-icon">
                                    <span>
                                        <i className="fa fa-play-circle fa-spin-hover" aria-hidden="true"></i>
                                    </span> 
                                </div>
                                <h4 className="text-center">Play Content</h4>
                            <div className="trailer-box">{video_src ? (<div> { ReactHtmlParser (video_src) } </div>) : null}</div>
                            </div>
                            {/* Modal footer  */}
                            <div className="modal-footer">
                                <button type="button" className="btn btn-theme close_me" data-dismiss="modal">Close</button>
                            </div>
                        </div>
                    </div>
                </div>
                </>
        )
    }
}

export default Detail