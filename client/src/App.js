// Dependencies
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// import { useAuth0 } from "./react-auth0-spa"

// Components
import Nav from "./components/Nav/Nav";
import Footer from "./components/Footer/index";
import Header from "./components/Header/Header";

// Pages
import Home from "./pages/Home";
import NoMatch from "./pages/NoMatch";
import "./App.css";
import Posts from "./pages/Posts";
import Detail from "./pages/Detail";
import Search from "./pages/Search";



function App() {
  // const { user, isAuthenticated, loginWithRedirect, logout } = useAuth0();
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
        <Route component={NoMatch} />
      </Switch>
      <Footer />
      </div>
    </Router>
  );
}

export default App;
