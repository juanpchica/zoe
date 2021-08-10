import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import "./App.scss";

//My Components
import Home from "./pages/Home/Home";
import Agents from "./pages/Agents/Agents";
import Navbar from "./components/Navbar";

function App() {
  return (
    <Router>
      <main>
        <header>
          <Navbar />
        </header>
        <section className='site-container'>
          <Switch>
            <Route path='/' exact component={Home} />
            <Route path='/agents' component={Agents} />
          </Switch>
        </section>
      </main>
    </Router>
  );
}

export default App;
