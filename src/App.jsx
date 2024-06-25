import { BrowserRouter, Route, Switch, Router } from "react-router-dom";
import * as Sentry from "@sentry/react";

import { UserContext } from "./components/UserContext";
import ProtectedRoute from "./components/routeWrappers/ProtectedRoute";
import useLocalStorageState from "./hooks/useLocalStorageState";
import LoginForm from "./components/auth/LoginForm";
import RegisterForm from "./components/auth/RegisterForm";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import ExerciseDetails from "./components/exercises/ExerciseDetails";
import UserDetails from "./components/users/UserDetails";
import WorkoutsDetails from "./components/workouts/WorkoutsDetails";
import ExerciseList from "./components/exercises/ExerciseList";

import "./App.css";

function App({ history }) {
  const [userData, setUserData] = useLocalStorageState({});

  // Create Custom Sentry Route component
  const SentryRoute = Sentry.withSentryRouting(Route);

  Sentry.init({
    dsn: "https://1cc4afebfa34f2843b91acb8ab5c6472@o4507487353241600.ingest.us.sentry.io/4507490069970944",
    integrations: [Sentry.reactRouterV5BrowserTracingIntegration({ history })],

    // We recommend adjusting this value in production, or using tracesSampler
    // for finer control
    tracesSampleRate: 1.0,
  });

  const register = (token, username) => setUserData({ token, username });

  const login = async (token, username) => {
    setUserData({ token, username });
  };

  const logout = () => setUserData({});

  return (
    <>
      <UserContext.Provider value={{ userData, logout }}>
        <Router history={history}>
          <Navbar />
          <main className="main">
            <Switch>
              <SentryRoute exact path="/">
                <Home />
              </SentryRoute>
              <SentryRoute exact path="/login">
                <LoginForm login={login} />
              </SentryRoute>
              <SentryRoute exact path="/register">
                <RegisterForm register={register} />
              </SentryRoute>
              <ProtectedRoute exact path="/exercises/:id">
                <ExerciseDetails />
              </ProtectedRoute>
              <ProtectedRoute exact path="/users/:username">
                <UserDetails />
              </ProtectedRoute>
              <ProtectedRoute exact path="/users/:username/workouts/:id">
                <WorkoutsDetails />
              </ProtectedRoute>
              <ProtectedRoute
                exact
                path="/users/:username/workouts/:id/exercises"
              >
                <ExerciseList />
              </ProtectedRoute>
              <SentryRoute>
                <h1 className="text-danger my-5 text-center bebas-neue-regular">
                  Hmmm. I can't seem to find what you're looking for.
                </h1>
              </SentryRoute>
            </Switch>
          </main>
        </Router>
      </UserContext.Provider>
    </>
  );
}

export default App;
