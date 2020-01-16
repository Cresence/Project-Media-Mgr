// Dependencies
import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import { useAuth0 } from "./react-auth0-wrapper";
import "./App.css";
import history from "./utils/history"


// Components
import Nav from "./components/Nav/Nav";
import Footer from "./components/Footer/index";
import Header from "./components/Header/Header";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute"
import Loading from "./components/Loading/Loading"

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

function App() {
    const { user, isAuthenticated, loading } = useAuth0();

    if (loading) {
      return <Loading />;
    }

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
          <Route component={NoMatch} />
        </Switch>
        <Footer />
        </div>
      </Router>
    );
  }

export default App;