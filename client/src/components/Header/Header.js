import React from "react"
import "./style.css";

function Header() {
    return (
        <div class="outer-container-box">
<div class="container">
  <br/>
  <div class="row">
    <div class="col-sm-8">
      <div id="logo">
        <a href="/">
        {/* {{!-- <h1>Logo</h1> --}} */}
        <img src="images/logo.png" width="150px"/>
        </a>
      </div>
      
    </div>
    <div class="col-sm-4">
     
      <div class="input-group">
        <input type="text" class="form-control" id="search-input" placeholder="Search for any Movie" />
        <button  class="search-movie" type="submit">
        
          <i class="fa fa-search" aria-hidden="true"></i>
        </button>
      </div>
      <br/>
    </div>
  </div>
</div>

<nav class="navbar navbar-expand-md bg-dark navbar-dark sticky-top">
  <div class="container">
    <a class="navbar-brand" href="/">Home</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="collapsibleNavbar">
    <ul class="navbar-nav mr-auto">
      <li class="nav-item">
        <a class="nav-link" href="popular" id="popular_movi">Popular Movies</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="top_rated" id="top_movi">Top Rated Movies</a>
      </li>    
      <li class="nav-item">
        <a class="nav-link" href="data" id="data_movi">Data</a>
      </li>    
    </ul>
    <ul class="navbar-nav ml-auto">
      <li class="nav-item">
        <a class="nav-link" href="#" data-toggle="modal" data-target="#signupFormModal">Sign-Up</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#" data-toggle="modal" data-target="#loginFormModal">Login</a>
      </li>    
    </ul>
  </div>
  </div>  
</nav>
<div class="main-container">
  {/* {{{body}}} */}
</div>
 <div class="container outer-box ">
   <div class="row search-result"></div>
 </div>
  
</div>
    )
}