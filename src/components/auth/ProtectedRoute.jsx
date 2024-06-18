import { Route, Redirect } from "react-router-dom";
import { UserContext } from "../UserContext";
import { useContext } from "react";

const ProtectedRoute = ({ path, exact, children }) => {
  const { userData } = useContext(UserContext);

  if (!userData.token) return <Redirect to="/" />;
  return (
    <Route exact={exact} path={path}>
      {children}
    </Route>
  );
};

export default ProtectedRoute;
