import "./App.css";
import Drawer from "./components/EmployeeModule/Drawer";
import Signin from "./components/EmployeeModule/Signin";
import Signup from './components/EmployeeModule/Signup'
import PrivateRoute from "./components/EmployeeModule/PrivateRoute";
import PublicRoute from "./components/EmployeeModule/PublicRoute";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import NoMatch from "./components/EmployeeModule/NoMatch";

function App() {
  
  return (
    <div>
      <Router>
        <Switch>
          <Route
            exact
            path="/"
            render={() => {
              return localStorage.getItem("user") ? (
                <Redirect to="/home" />
              ) : (
                <Redirect to="/signin" />
              );
            }}
          />
           
          <PublicRoute restricted={true} component={Signin} path="/signin" exact/>
          <PublicRoute restricted={true} component={Signup} path="/signup" exact/>
          
          <PrivateRoute component={Drawer} path="/home"/>
          <Route path="*">
            <NoMatch/>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
