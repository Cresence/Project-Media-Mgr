// Dependencies

import React, { Component } from "react";
import InfiniteScroll from 'react-infinite-scroll-component';
import MovieCard from "../components/MovieCard/MovieCard";
// import Ad from "../components/Ad/Ad";

// Predefined methods to call from local database
import API from "../utils/API"

class Posts extends Component {

    state = {
        postData: [],
        searchQuery: ""
    };


componentDidMount() {
    this.loadData()
}

handleInputChange = event => {
  const { name, value } = event.target;
  this.setState({
    [name]: value
  });
};


loadData = () => {
    API.getPosts()
        .then(result => this.setState({ postData: result.data }))
        .catch(err => console.log("Error loading database... \n" + err))
}
  // Render of React Components/Page
    render(){
      const { searchQuery, postData } = this.state;
      const filterItems = (arr, query) => {
        return arr.filter(el => el.news_title.toLowerCase().indexOf(query.toLowerCase()) !== -1)
      }

        return (
                    <div id="home" className="py-3">
                        <div className="container outer-box py-5">
                            <div className="row d-flex justify-content-center">
                                <div className="col-sm-8">
                                    <div className="input-group">
                                        <input type="text" className="form-control" id="search-input" onChange={this.handleInputChange} value={this.state.searchQuery} name="searchQuery" placeholder="Search here..." />
                                          <button className="search-movie" type="submit">
                                          <i className="fa fa-search" aria-hidden="true" style={{color: "#fff"}}></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="row movie_box py-5">
                                    {/* Takes array of objects as arguments and convers them to JSX elements */}
                                        <InfiniteScroll
                                          dataLength={this.state.postData.length}
                                          next={this.fetchMoreData}
                                          hasMore={this.state.hasMore}
                                          loader={<h4>Loading...</h4>}
                                        >
                                          {postData ? filterItems(postData, searchQuery).map(element => (
                                        <MovieCard
                                        Title={element.news_title}
                                        imdbID={element._id}
                                        Plot={element.description}
                                        Poster={element.image_url}
                                        key={element._id ? element._id : Math.floor(Math.random() * 1000)}
                                        />
                                        )) : <h5 className="py-5 d-flex justify-content-center" style={{textAlign: "center", margin: "auto"}}>Nothing available at this time... Try again later!</h5>}
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