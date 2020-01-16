// Dependencies

import React, { Component } from "react";
// import axios from "axios";
import MovieCard from "../components/MovieCard/MovieCard"
import Pagination from "../components/Pagination";

// Predefined methods to call from local database
import API from "../utils/API"

class Posts extends Component {

    constructor() {
        super();

        this.state = {
            postData: [],
            pageOfItems: []
        };

        // bind function in constructor instead of render (https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-no-bind.md)
        this.onChangePage = this.onChangePage.bind(this);
    }

componentDidMount() {
    this.loadData()
}

onChangePage(pageOfItems) {
    // update state with new page of items
    this.setState({ pageOfItems: pageOfItems });
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
                                         <div>
                        {this.state.pageOfItems.map(item =>
                            <div key={item.id}>{item.name}</div>
                        )}
                        <Pagination items={this.state.postData.map(element => (
                                        <MovieCard
                                        Title={element.news_title}
                                        imdbID={element._id}
                                        Plot={element.description}
                                        Poster={element.image_url}
                                        // key={Math.floor(Math.random() * 10000000)
                                        key={element._id ? element._id : Math.floor(Math.random() * 1000)}
                                        />
                                        ))} onChangePage={this.onChangePage} />
                <hr />
                <div className="credits text-center">
                    <p>
                        <a href="http://jasonwatmore.com" target="_top">JasonWatmore.com</a>
                    </p>
                </div>
            </div>
                            </div>
                            {/* <div className="row">
                                <div className="col-12">
                                    <h1 style={styles.bodyContent}>{"{ Ad Here }"}</h1>
                                </div>
                            </div> */}
                            <br />
                        </div>
                    </div>
        )
    }
}

export default Posts;