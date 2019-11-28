import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Nav from "./components/Nav/Nav"
import Footer from "./components/Footer/index"
import Header from "./components/Header/Header"
import Home from "./pages/Home"
import NoMatch from "./pages/NoMatch"
import "./App.css";


function App() {
  return (
    <Router>
      <div className="outer-container-box">
      <Nav />
      <Header />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route component={NoMatch} />
      </Switch>
      <Footer />
      </div>
    </Router>
  );
}

export default App;
