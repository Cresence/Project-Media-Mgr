import React, { Component } from 'react';

class Home extends Component {

    state = {
        posts: {}
    };

    componentDidMount() {
    };
    
    render() {

        const styles = {
            bodyContent: {
              textAlign: "center",
            }
          };
          
            return (
                <>
                <br/>
                <div id="home">
                    <div className="container outer-box">
            
                        <div className="row">
                            <div className="col-12">
                                <h1 style={styles.bodyContent}>{"{ Ad Here }"}</h1>
                            </div>
                        </div>

                        {/* Body Content */}
                        <div className="row">
                            <div className="col-12">
                                <h1 style={styles.bodyContent}>{"{ Body Content }"}</h1>
                            </div>
                        </div>

                        {/* End of Body Content */}

                        <div className="row">
                            <div className="col-12">
                                <h1 style={styles.bodyContent}>{"{ Ad Here }"}</h1>
                            </div>
                        </div>
                    </div>
                </div>
                </>
            )
        }
    }

export default Home;