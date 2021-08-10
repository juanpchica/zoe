import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

//Styles
import "./App.scss";

//My Components
import Home from "./pages/Home/Home";
import Agents from "./pages/Agents/Agents";
import Navbar from "./components/Navbar";

//Redux
import { Provider } from "react-redux";
import store from "./redux/store";

function App() {
  return (
    <Provider store={store}>
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
    </Provider>
  );
}

export default App;
