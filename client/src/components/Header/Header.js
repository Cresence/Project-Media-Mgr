import React, { Component } from "react";
import { Link } from "react-router-dom";
import  "./style.css"
// import temp_slider from "../../assets/avengers.jpg";
import slider_temp from "../../assets/slider_temp.jpg"
import API from "../../utils/API"

class Header extends Component {

  state = {
    sliders: []
  };

  componentDidMount() {
    this.loadSliders()
  };

  loadSliders = () => {
    API.getSliders()
      .then(res =>
        this.setState({ sliders: res.data, title: "", description: "", linkTo: "",date: ""})
      )
      .catch(err => console.log(err));
  };

  render() {
    const styles = {
      imgStyle: {
        height: "375px",
        alignSelf: "center"
      }
    }

    const slideA = this.state.sliders ? this.state.sliders[0] : null;
    const slideB = this.state.sliders ? this.state.sliders[1] : null;
    const slideC = this.state.sliders ? this.state.sliders[2] : null;
    const slideD = this.state.sliders ? this.state.sliders[3] : null;

    return (
    <div id="demo" className="carousel slide" data-ride="carousel">
      <ul className="carousel-indicators">
        <li data-target="#demo" data-slide-to="0" className="active"></li>
        <li data-target="#demo" data-slide-to="1"></li>
        <li data-target="#demo" data-slide-to="2"></li>
        <li data-target="#demo" data-slide-to="3"></li>
      </ul>
      <div className="carousel-inner">
        <div className="carousel-item active">
          <img src={this.state.sliders.length ? slideA.image : slider_temp} alt={this.state.sliders.length ? slideA.title : "ph"} style={styles.imgStyle} />
          <div className="carousel-caption">
            {this.state.sliders.length ? <h3><span>{slideA.description}</span></h3> : null }
            {this.state.sliders.length ? <p><a href={slideA.linkTo} id="ph1" className="btn btn-theme more-posts" target="_blank" rel="noopener noreferrer">More Detail</a></p> : null}
          </div>   
        </div>
        <div className="carousel-item">
          <img src={this.state.sliders[1] ? slideB.image : slider_temp} alt={this.state.sliders[1] ? slideB.title : "ph"} style={styles.imgStyle} />
          <div className="carousel-caption">
            {this.state.sliders[1] ? <h3><span>{slideB.description}</span></h3> : null }
            {this.state.sliders[1] ? <p><a href={slideB.linkTo} id="ph1" className="btn btn-theme more-posts" >More Detail</a></p> : null}
          </div>   
        </div>
        <div className="carousel-item">
          <img src={this.state.sliders[2] ? slideC.image : slider_temp} alt={this.state.sliders[2] ? slideC.title : "ph"} style={styles.imgStyle} />
          <div className="carousel-caption">
            {this.state.sliders[2] ? <h3><span>{slideC.description}</span></h3> : null }
            {this.state.sliders[2] ? <p><a to={slideC.linkTo} id="ph1" className="btn btn-theme more-posts" target="_blank" rel="noopener noreferrer">More Detail</a></p> : null}
          </div>   
        </div>
        <div className="carousel-item">
          <img src={this.state.sliders[3] ? slideD.image : slider_temp} alt={this.state.sliders[3] ? slideD.title : "ph"} style={styles.imgStyle} />
          <div className="carousel-caption">
            {this.state.sliders[3] ? <h3><span>{slideD.description}</span></h3> : null }
            {this.state.sliders[3] ? <p><a to={slideD.linkTo} id="ph1" className="btn btn-theme more-posts" target="_blank" rel="noopener noreferrer">More Detail</a></p> : null}
          </div>   
        </div>
      </div>
      <a className="carousel-control-prev" href="#demo" data-slide="prev">
        <span className="carousel-control-prev-icon"></span>
      </a>
      <a className="carousel-control-next" href="#demo" data-slide="next">
        <span className="carousel-control-next-icon"></span>
      </a>
    </div>
    )
}
}

export default Header