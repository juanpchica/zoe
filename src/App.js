import "./App.css";

import { createTheme, MuiThemeProvider } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

import themeFile from "./util/theme";
import SearchAgent from "./components/SearchAgent";
import Agents from "./components/Agents";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

const theme = createTheme(themeFile);

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <Router>
        <Container>
          <Route path='/agents/:amount' component={Agents} />
          <Route path='/' exact component={SearchAgent} />
        </Container>
      </Router>
    </MuiThemeProvider>
  );
}

export default App;
