import React, { Component } from 'react';

class Home extends Component {

    state = {
        posts: {}
    };

    componentDidMount() {
    };
    
    render() {
            return (
                <>
                <br/>
                <div id="home">
                    <div className="container outer-box">
            
                        <div className="row">
                            <div className="col-12">
                                <h1 className="top-heading">Placeholder Heading</h1>
                            </div>
                        </div>
                    </div>
                </div>
                </>
            )
        }
    }

export default Home;