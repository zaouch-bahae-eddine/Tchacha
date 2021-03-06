import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import { AuthProvider } from "./Auth/AuthProvider";
import { GlobalStyle } from "./Component/GlobalStyle";
import LogoutBar from "./Component/LogoutBar";
import Channel from "./page/Channel";
import Home from "./page/Home";
import Member from "./page/Member";
import Register from "./page/Register";
import SignIn from "./page/SignIn";
import Tchatchat from "./page/Tchatchat";

function App() {
  return (
    <div className="App">
      <GlobalStyle />
      <AuthProvider>
        <LogoutBar />
        <Router>
          <Switch>

            <Route exact path="/" >
              <Home />
            </Route>

            <Route exact path="/channel" >
              <Channel />
            </Route>

            <Route exact path="/signin">
              <SignIn />
            </Route>

            <Route exact path="/register">
              <Register />
            </Route>


            <Route exact path="/members/:id">
              <Member />
            </Route>

            <Route exact path="/messages/:id">
              <Tchatchat />
            </Route>

          </Switch>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
