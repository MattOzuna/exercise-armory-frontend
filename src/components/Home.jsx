import { UserContext } from "./UserContext";
import { useContext } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import ExerciseSearch from "./exercises/ExerciseSearch";

const Home = () => {
  const { userData } = useContext(UserContext);
  if (!userData.token) {
    return (
      <>
        <h1 className="my-5">Welcome to Exercise Armory!</h1>
        <div>
          <span className="mx-5">
            <Link to="/login" className="btn btn-primary">
              Login
            </Link>
          </span>
          <span className="mx-5">
            <Link to="/register" className="btn btn-primary">
              Register
            </Link>
          </span>
        </div>
      </>
    );
  }
  return (
    <>
      <h1 className="my-5">Welcome back, {userData.username}!</h1>
      <div>
        <ExerciseSearch />
      </div>
    </>
  );
};

export default Home;
