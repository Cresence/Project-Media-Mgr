// Dependencies

import React, { Component } from "react";
// import axios from "axios";
// import MovieCard from "../components/MovieCard/MovieCard"

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
        console.log(window.location.href)
        return (
                    <div id="home" className="py-5">
                        <div className="container outer-box">
                            {/* <div className="row">
                                <div className="col-12">
                                    <h1 style={styles.bodyContent}>{"{ Ad Here }"}</h1>
                                </div>
                            </div> */}
                            <div className="row movie_box">
                                    {/* Takes array of objects as arguments and convers them to JSX elements */}

                                    <p>{window.location.href}</p>
                                    <h5>This is the search page</h5>

                                        {/* {this.state.postData.length ? this.state.postData.filter(e => e.category || e.news_title === this.props.match.params.id).map(element => (
                                        <MovieCard
                                        Title={element.news_title}
                                        imdbID={element._id}
                                        Plot={element.description}
                                        Poster={element.image_url}
                                        // key={Math.floor(Math.random() * 10000000)
                                        key={element._id ? element._id : Math.floor(Math.random() * 1000)}
                                        />
                                        )) : <h5 className="py-5" style={{textAlign: "center", margin: "auto"}}>Nothing available at this time... Try again later!</h5>} */}
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