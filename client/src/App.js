// Dependencies
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useAuth0 } from "./react-auth0-wrapper";

// Components
import Nav from "./components/Nav/Nav";
import Footer from "./components/Footer/index";
import Header from "./components/Header/Header";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";

// Pages
import Home from "./pages/Home";
import NoMatch from "./pages/NoMatch";
import "./App.css";
import Posts from "./pages/Posts";
import Detail from "./pages/Detail";
import Search from "./pages/Search";
import Articles from "./pages/Articles";
import Profile from "./pages/Profile"




function App() {
  const { loading } = useAuth0();
  const { user, isAuthenticated, loginWithRedirect, logout } = useAuth0();
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
        <PrivateRoute path="/profile" component={Profile} /> 
        <Route component={NoMatch} />
      </Switch>
      <Footer />
      </div>
    </Router>
  );
}

export default App;
