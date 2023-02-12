// Dependencies
import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import { useAuth0 } from "./react-auth0-wrapper";
import "./App.css";
import history from "./utils/history";
// import ReactGA from 'react-ga';

// Components
import Nav from "./components/Nav/Nav";
import Footer from "./components/Footer/index";
import Header from "./components/Header/Header";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute"
import Loading from "./components/Loading/Loading"
// import API from "./utils/API";

// Pages
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
import ExternalApi from "./components/ExternalApi/ExternalApi"
// import Search from "./pages/Search"

// Initialize google analytics page view tracking
// history.listen(location => {
//  ReactGA.set({ page: location.pathname }); // Update the user's current page
//  ReactGA.pageview(location.pathname); // Record a pageview for the given page
// });

// const trackingId = "UA-1234567890-1"; // Replace with your Google Analytics tracking ID
// ReactGA.initialize(trackingId);
// ReactGA.set({
//   userId: auth.currentUserId(),
  // any data that is relevant to the user session
  // that you would like to track with google analytics
// });

function App() {
    const { loading, user, isAuthenticated } = useAuth0();
    if (loading) {
      return <Loading />;
    }

    return (
      <Router history={history}>
        <div className="outer-container-box">
        <Nav />
        <Header />
        <Switch>
          <Route exact path="/" component={Posts} />
          <Route exact path="/posts" component={Posts} />
          <Route exact path="/posts/:id" component={Detail} />
          <Route exact path="/articles" component={Articles} />
          <Route exact path="/articles/categories/:id" component={PostAlt} />
          <PrivateRoute exact path="/profile" component={Profile} />
          <PrivateRoute exact path="/external-api" component={ExternalApi} />
          <Route exact path="/admin/news" render={(props) => <NewsPost {...props} userInfo={user} isAuth={isAuthenticated} />} />
          <PrivateRoute exact path="/admin/slider" component={Sliders} />
          <PrivateRoute exact path="/sliders/:id" component={UpdateSlider} />
          <PrivateRoute exact path="/articles/:id" component={UpdatePost} />
          <Route component={NoMatch} />
        </Switch>
        <Footer />
        </div>
      </Router>
    );
  }

export default App;