import React, { Component } from "react";
import Post from "../Post/Post"
import "./style.css";

class ArticleCard extends Component {
    state = {
        posts: [
            {content: 'This is my first post!'},
            {content: 'This is my second post!'}
        ]
    }

    render() {
        const posts = this.state.posts.map((post, index) => 
         <Post key={index} value={post} />
        );
        return (
            <div className="feed">
                {posts}
            </div>
        )
    }
}

export default ArticleCard