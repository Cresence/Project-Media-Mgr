import React, { Component } from "react";

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