import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useState } from "react";
import { UserContext } from "./components/UserContext";

import ProtectedRoute from "./helpers/ProtectedRoute";
import LoginForm from "./components/auth/LoginForm";
import RegisterForm from "./components/auth/RegisterForm";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import ExerciseDetails from "./components/exercises/ExerciseDetails";

import "./App.css";

function App() {
  const [userData, setUserData] = useState({});
  const register = (token, username) => setUserData({ token, username });

  const login = async (token, username) => {
    setUserData({ token, username });
  };

  const logout = () => setUserData({});

  return (
    <>
      <UserContext.Provider value={{ userData, logout }}>
        <BrowserRouter>
          <Navbar />
          <main className="main">
            <Switch>
              <Route exact path="/">
                <Home />
              </Route>
              <Route exact path="/login">
                <LoginForm login={login} />
              </Route>
              <Route exact path="/register">
                <RegisterForm register={register} />
              </Route>
              <ProtectedRoute exact path="/exercises/:id">
                <ExerciseDetails />
              </ProtectedRoute>
              <Route>
                <p className="text-warning font-weight-bold my-5">
                  Hmmm. I can't seem to find what you want.
                </p>
              </Route>
            </Switch>
          </main>
        </BrowserRouter>
      </UserContext.Provider>
    </>
  );
}

export default App;
