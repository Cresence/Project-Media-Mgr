// Dependencies
import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch, withRouter } from "react-router-dom";
import { useAuth0 } from "./react-auth0-wrapper";
import "./App.css";
import auth0Client from './Auth';


// Components
import Nav from "./components/Nav/Nav";
import Footer from "./components/Footer/index";
import Header from "./components/Header/Header";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import SecuredRoute from "./components/SecuredRoute/SecuredRoute"

// Pages
import Home from "./pages/Home";
import NoMatch from "./pages/NoMatch";
import Posts from "./pages/Posts";
import Detail from "./pages/Detail";
import Search from "./pages/Search";
import Articles from "./pages/Articles";
import Profile from "./pages/Profile"
import NewsPost from "./Admin/NewsPost";
import UpdatePost from "./Admin/UpdatePost";


class App extends Component {

  async componentDidMount() {
    if (this.props.location.pathname === '/callback') {
      this.setState({checkingSession:false});
      return;
    }
      try {
      await auth0Client.silentAuth();
      this.forceUpdate();
    } catch (err) {
      if (err.error !== 'login_required') console.log(err.error);
    }
    this.setState({checkingSession:false});
  }

  render() {
    const { user, isAuthenticated, loginWithRedirect, logout, loading } = useAuth0();  
    return (
      <Router>
        <div className="outer-container-box">
        <Nav />
        <Header />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/posts" component={Posts} />
          <Route exact path="/posts/:id" component={Detail} />
          <Route exact path="/?s=:id" component={Search} />
          <Route exact path="/articles" component={Articles} />
          <SecuredRoute path="/profile" component={Profile} checkingSession={this.state.checkingSession} /> 
          <SecuredRoute path="/admin/news" render={(props) => <NewsPost {...props} isAuth={isAuthenticated} userInfo={user} checkingSession={this.state.checkingSession} />} />
          <SecuredRoute path="/articles/:id" component={UpdatePost} checkingSession={this.state.checkingSession} />
          <Route component={NoMatch} />
        </Switch>
        <Footer />
        </div>
      </Router>
    );
  }
}

export default withRouter(App);