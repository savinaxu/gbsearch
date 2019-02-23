import React, { Component } from 'react';
import Footer from "./components/Footer";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;
