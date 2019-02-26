import React, { Component } from 'react';
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Nav from "./components/Nav"

import { BrowserRouter as Router, Route, Switch } from "react-router-dom"

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Nav />
          <Switch>
            <Route exact path="/" component={Home} />
            {/* <Route exact path="/saved" component={Saved} />
            <Route component={NoMatch} /> */}
          </Switch>
          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;
