import React from "react";

function Header() {
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
      <img src="pub_assets/images/avengers.jpg" alt="ph1" width="1100" height="500" />
      <div className="carousel-caption">
        <h3><span>Placeholder 1</span></h3>
        <p><a href={"/posts/tt4154796"} id="ph1" className="btn btn-theme more-posts" >See More posts</a></p>
      </div>   
    </div>
    <div className="carousel-item">
      <img src="pub_assets/images/avengers.jpg" alt="ph2" width="1100" height="500" />
      <div className="carousel-caption">
        <h3><span>Placeholder 2</span></h3>
        <p><a href={"/posts/tt4154796"} id="ph2" className="btn btn-theme more-posts">See More posts</a></p>
      </div>   
    </div>
    <div className="carousel-item">
      <img src="pub_assets/images/avengers.jpg" alt="ph3" width="1100" height="500" />
      <div className="carousel-caption">
        <h3><span>Placeholder 3</span></h3>
        <p><a href={"/posts/tt4154796"} id="ph3" className="btn btn-theme more-posts">See More posts</a></p>
      </div>   
    </div>
    <div className="carousel-item">
      <img src="pub_assets/images/avengers.jpg" alt="ph4" width="1100" height="500" />
      <div className="carousel-caption">
        <h3><span>Placeholder 4</span></h3>
        <p><a href={"/posts/tt4154796"} id="ph4" className="btn btn-theme more-posts">See More posts</a></p>
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

export default Header