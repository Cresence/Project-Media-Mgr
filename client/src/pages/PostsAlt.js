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
                    <div id="home" className="py-3">
                        <div className="container outer-box py-5">
                            <div className="row movie_box py-5">
                                    {/* Takes array of objects as arguments and convers them to JSX elements */}
                                        <InfiniteScroll
                                          dataLength={this.state.postData.length}
                                          next={this.fetchMoreData}
                                          hasMore={this.state.hasMore}
                                          loader={<h4>Loading...</h4>}
                                        >
                                          {this.state.postData.length ? this.state.postData.filter(e => e.category === this.props.match.params.id).map(element => (
                                        <MovieCard
                                        Title={element.news_title}
                                        imdbID={element._id}
                                        Plot={element.description}
                                        Poster={element.image_url}
                                        key={element._id ? element._id : Math.floor(Math.random() * 1000)}
                                        />
                                        )) : <h5 className="py-5" style={{textAlign: "center", margin: "auto"}}>Nothing available at this time... Try again later!</h5>}

                                        </InfiniteScroll>
                            </div>
                        {/* <div className="row">
                                <div className="col">
                                    <Ad />
                                </div>
                            </div> */}

                        </div>
                    </div>
        )
    }
}

export default Posts;