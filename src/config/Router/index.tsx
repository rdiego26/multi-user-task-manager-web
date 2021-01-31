import { memo } from "react";
import {
  BrowserRouter,
  Switch,
  Route,
} from "react-router-dom";
import Home from "../../app/screens/Home";
import Login from "../../app/screens/Login";
import PrivateRoute from "./PrivateRoute";

const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/login" component={Login} />
      <PrivateRoute exact path="/" component={Home} />
    </Switch>
  </BrowserRouter>
);

export default memo(Router);