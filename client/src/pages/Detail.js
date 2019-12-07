import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import Jumbotron from "../components/Jumbotron";

class Detail extends Component {

    state = {
        post: {}
    };

    componentDidMount() {
        this.getMovieData();
    }

    getMovieData = props => {
    
            let queryURL =
          "https://www.omdbapi.com/?t=" + this.props.match.params.id + "&apikey=trilogy"
    
            axios.get(queryURL)
                .then(result => this.setState({ posts: result.data }));
    
        };
}

export default Detail