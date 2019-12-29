import React, { Component } from "react";

class Post extends Component {
    render() {
        return (
            <div className="post">
                <span>{this.props.value.content}</span>
            </div>
        )
    }
}

export default Post