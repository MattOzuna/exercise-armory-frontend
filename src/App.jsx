import { BrowserRouter, Route, Switch } from "react-router-dom";
import { UserContext } from "./components/UserContext";

import ProtectedRoute from "./components/auth/ProtectedRoute";
import useLocalStorageState from "./hooks/useLocalStorageState";
import LoginForm from "./components/auth/LoginForm";
import RegisterForm from "./components/auth/RegisterForm";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import ExerciseDetails from "./components/exercises/ExerciseDetails";

import "./App.css";

function App() {
  const [userData, setUserData] = useLocalStorageState({});
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
                <h1 className="text-danger my-5 text-center">
                  Hmmm. I can't seem to find what you're looking for.
                </h1>
              </Route>
            </Switch>
          </main>
        </BrowserRouter>
      </UserContext.Provider>
    </>
  );
}

export default App;
