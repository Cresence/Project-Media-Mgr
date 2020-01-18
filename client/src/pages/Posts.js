// Dependencies

import React, { Component } from "react";
import InfiniteScroll from 'react-infinite-scroll-component';
import MovieCard from "../components/MovieCard/MovieCard"

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
  // API call using predefined inquiry, returns responses as array of objects (Placeholder content)
//   getpostData = () => {
    
//     this.state.movies.map((e, i) => {
//         let queryURL =
//       "https://www.omdbapi.com/?t=" + this.state.movies[i] + "&apikey=trilogy"

//         axios.get(queryURL)
//             .then(result => this.setState({ postData: [...this.state.postData, result.data] }));

//             return e;
//     });
       
//   }

  // Render of React Components/Page
    render(){
        // const styles = {
        //     bodyContent: {
        //       textAlign: "center",
        //       marginTop: "20px",
        //       marginBottom: "20px"
        //     }
        //   };

        return (
                    <div id="home" className="py-5">
                        <div className="container outer-box">
                            <div className="row">
                                <div className="col-12">
                                    {/* <h1 style={styles.bodyContent}>{"{ Ad Here }"}</h1> */}
                                </div>
                            </div>
                            <div className="row movie_box">
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
                                    <h1 style={styles.bodyContent}>{"{ Ad Here }"}</h1>
                                </div>
                            </div> */}
                        </div>
                    </div>
        )
    }
}

export default Posts;