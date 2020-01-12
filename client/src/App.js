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

// Pages
import Home from "./pages/Home";
import NoMatch from "./pages/NoMatch";
import Posts from "./pages/Posts";
import Detail from "./pages/Detail";
import Articles from "./pages/Articles";
import Profile from "./pages/Profile"
import NewsPost from "./Admin/NewsPost";
import UpdatePost from "./Admin/UpdatePost";
import Sliders from "./Admin/Sliders";
import UpdateSlider from "./Admin/UpdatePost"

function App() {
    const { user, isAuthenticated } = useAuth0();
    return (
      <Router history={history}>
        <div className="outer-container-box">
        <Nav userInfo={user}/>
        <Header />
        <Switch>
          {/* <Route exact path='/callback' component={Callback}/> */}
          <Route exact path="/" component={Home} />
          <Route exact path="/posts" component={Posts} />
          <Route exact path="/posts/:id" component={Detail} />
          <Route exact path="/articles" component={Articles} />
          <PrivateRoute exact path="/profile" component={Profile} />
          <PrivateRoute exact path="/admin/news" render={(props) => <NewsPost {...props} isAuth={isAuthenticated} userInfo={user} />} />
          <PrivateRoute exact path="/admin/slider" render={(props) => <Sliders {...props} isAuth={isAuthenticated} />} />
          {/* <PrivateRoute exact path="/admin/news" component={NewsPost} checkingSession={this.state.checkingSession} />} /> */}
          <PrivateRoute exact path="/articles/:id" component={UpdatePost} />
          <PrivateRoute exact path="/sliders/:id" component={UpdateSlider} />
          <Route component={NoMatch} />
        </Switch>
        <Footer />
        </div>
      </Router>
    );
  }

export default App;