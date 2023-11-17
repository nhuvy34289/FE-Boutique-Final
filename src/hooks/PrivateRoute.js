import { Route, Redirect } from "react-router-dom";

const PrivateRoute = (props) => {
  const firstLogin = localStorage.getItem("firstLogin");
  return firstLogin === null ? <Redirect to="/" /> : <Route {...props} />;
};

export default PrivateRoute;
