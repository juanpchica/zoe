import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import "./App.scss";

//My Components
import Home from "./pages/Home/Home";
import Agents from "./pages/Agents/Agents";
import Navbar from "./components/Navbar";

function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path='/' exact component={Home} />
        <Route path='/agents' component={Agents} />
      </Switch>
    </Router>
  );
}

export default App;
