import React, { Component } from "react";
import MovieCard from "../components/MovieCard/MovieCard"

class Search extends Component {
    state = {
        result: {}
    }

    componentDidMount() {
        console.log("Loaded");
    }

    render() {
        return(
            console.log("End of app.")
        )
    }
}

export default Search;