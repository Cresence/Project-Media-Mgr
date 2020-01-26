// Dependencies

import React, { Component } from "react";
import InfiniteScroll from 'react-infinite-scroll-component';
import MovieCard from "../components/MovieCard/MovieCard";
// import Ad from "../components/Ad/Ad";

// Predefined methods to call from local database
import API from "../utils/API"

class Posts extends Component {

    state = {
        postData: []
    };


componentDidMount() {
    this.loadData()
}

loadData = () => {
    API.getPosts()
        .then(result => this.setState({ postData: result.data }))
        .catch(err => console.log("Error loading database... \n" + err))
}
  // Render of React Components/Page
    render(){

        

        return (
                    <div id="home" className="py-5">
                        <div className="container outer-box">
                            <div className="row d-flex justify-content-center">
                                <div className="col-sm-8">
                                    <div className="input-group">
                                      {/* <form className="form-inline"> */}
                                        <input type="search" className="form-control" id="search-input" placeholder="Search here..." />
                                          <button className="search-movie" type="submit">
                                          <i className="fa fa-search" aria-hidden="true" style={{color: "#fff"}}></i>
                                        </button>
                                      {/* </form> */}
                                    </div>
                                </div>
                            </div>
                            <div className="row movie_box py-5">
                                    {/* Takes array of objects as arguments and convers them to JSX elements */}

                                        {/* {this.state.postData.map(element => (
                                        <MovieCard
                                        Title={element.news_title}
                                        imdbID={element._id}
                                        Plot={element.description}
                                        Poster={element.image_url}
                                        // key={Math.floor(Math.random() * 10000000)
                                        key={element._id ? element._id : Math.floor(Math.random() * 1000)}
                                        />
                                        ))} */}
                                        <InfiniteScroll
                                          dataLength={this.state.postData.length}
                                          next={this.fetchMoreData}
                                          hasMore={this.state.hasMore}
                                          loader={<h4>Loading...</h4>}
                                        >
                                          {this.state.postData.map(element => (
                                        <MovieCard
                                        Title={element.news_title}
                                        imdbID={element._id}
                                        Plot={element.description}
                                        Poster={element.image_url}
                                        // key={Math.floor(Math.random() * 10000000)
                                        key={element._id ? element._id : Math.floor(Math.random() * 1000)}
                                        />
                                        ))}
                                        </InfiniteScroll>
                            </div>
                            {/* <div className="row">
                                <div className="col-12">
                                    <Ad />
                                </div>
                            </div> */}
                        </div>
                    </div>
        )
    }
}

export default Posts;