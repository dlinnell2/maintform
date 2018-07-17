import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Form from "./pages/Form";
import Success from "./pages/Success";

const App = () => (

  <Router>
    <div>

      <Route exact path="/" component={Form} />
      <Route exact path="/success" component={Success} />

    </div>
  </Router>
);

export default App;
