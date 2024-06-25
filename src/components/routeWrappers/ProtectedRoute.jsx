import { Route, Redirect } from "react-router-dom";
import { UserContext } from "../UserContext";
import { useContext } from "react";
import * as Sentry from "@sentry/react";

const ProtectedRoute = ({ path, exact, children }) => {
  const { userData } = useContext(UserContext);

  const SentryRoute = Sentry.withSentryRouting(Route);

  if (!userData.token) return <Redirect push to="/" />;
  return (
    <SentryRoute exact={exact} path={path}>
      {children}
    </SentryRoute>
  );
};

export default ProtectedRoute;
