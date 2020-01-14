// Dependencies
import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import { useAuth0 } from "./react-auth0-wrapper";
import "./App.css";
import history from "./utils/history"
// import auth0Client from './Auth';
// import Callback from './Callback';


// Components
import Nav from "./components/Nav/Nav";
import Footer from "./components/Footer/index";
import Header from "./components/Header/Header";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute"
import ExternalApi from "./components/ExternalApi/ExternalApi"

// Pages
// import Home from "./pages/Home";
import NoMatch from "./pages/NoMatch";
import Posts from "./pages/Posts";
import Detail from "./pages/Detail";
import Articles from "./pages/Articles";
import Profile from "./pages/Profile"
import NewsPost from "./Admin/NewsPost";
import UpdatePost from "./Admin/UpdatePost";
import Sliders from "./Admin/Sliders";
import UpdateSlider from "./Admin/UpdateSlider"
import PostAlt from "./pages/PostsAlt"

function App() {
    const { user, isAuthenticated } = useAuth0();

    // function populateStorage(){
    //   if (isAuthenticated)
    //   // var userInfo = user 
    //   sessionStorage.setItem(user, user) 
    //   sessionStorage.setItem('isAuthenticatedStatus', isAuthenticated)
    //   console.log(user)
    // }

    // populateStorage()

    // // const userInfo = sessionStorage.getItem('userInfo')
    // const isAuthenticatedStatus = sessionStorage.getItem('isAuthenticatedStatus');
    // const userInfo = sessionStorage.getItem('userInfo')
    // // userInfo ? console.log(userInfo) : console.log("No user loaded");
    // console.log("Auth0: " + user)
    // console.log("Session Storage: " + userInfo)
    // // console.log(userInfo)
    // console.log("Auth0: " + isAuthenticatedStatus)
    // isAuthenticatedStatus ? console.log("Session Storage: " + isAuthenticatedStatus) : console.log("No status")

    return (
      <Router history={history}>
        <div className="outer-container-box">
        <Nav userInfo={user}/>
        <Header />
        <Switch>
          {/* <Route exact path='/callback' component={Callback}/> */}
          <Route exact path="/" component={Posts} />
          <Route exact path="/posts" component={Posts} />
          <Route exact path="/posts/:id" component={Detail} />
          <Route exact path="/articles" component={Articles} />
          <Route exact path="/articles/categories/:id" component={PostAlt} />
          <PrivateRoute exact path="/profile" component={Profile} />
          <PrivateRoute exact path="/admin/news" render={(props) => <NewsPost {...props} isAuth={isAuthenticated} userInfo={user} />} />
          <PrivateRoute exact path="/admin/slider" render={(props) => <Sliders {...props} isAuth={isAuthenticated} />} />
          {/* <PrivateRoute exact path="/admin/news" component={NewsPost} checkingSession={this.state.checkingSession} />} /> */}
          <PrivateRoute exact path="/sliders/:id" component={UpdateSlider} />
          <PrivateRoute exact path="/articles/:id" component={UpdatePost} />
          <PrivateRoute exact path="/external-api" component={ExternalApi} />
          <Route component={NoMatch} />
        </Switch>
        <Footer />
        </div>
      </Router>
    );
  }

export default App;