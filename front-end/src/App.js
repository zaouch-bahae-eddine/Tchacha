import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import { AuthProvider } from "./Auth/AuthProvider";
import Home from "./page/Home";
import Register from "./page/Register";
import SignIn from "./page/SignIn";

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Router>
          <Switch>

            <Route exact path="/" >
              <Home />
            </Route>

            <Route exact path="/signin">
              <SignIn />
            </Route>

            <Route exact path="/register">
              <Register />
            </Route>

          </Switch>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;