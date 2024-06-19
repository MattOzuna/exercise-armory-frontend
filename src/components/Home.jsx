import { UserContext } from "./UserContext";
import { useContext, useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Spinner from "react-bootstrap/Spinner";
import { Link, Redirect } from "react-router-dom/cjs/react-router-dom.min";

import ExerciseSearch from "./exercises/ExerciseSearch";
import exerciseArmoryApi from "../api/api";

const Home = () => {
  const [exercises, setExercises] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const { userData } = useContext(UserContext);

  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const res = await exerciseArmoryApi.getExercises();
        setExercises(res);
        setIsLoading(false);
      } catch (err) {
        setError(true);
        setIsLoading(false);
        console.error(err);
      }
    };

    if (isLoading && userData.token) {
      fetchExercises();
    }
  }, [isLoading]);

  if (isLoading && userData.token) {
    return (
      <Container className="w-50 text-center my-5">
        <Spinner animation="border" role="status">
          {" "}
          <span className="visually-hidden">Loading...</span>
        </Spinner>
        <span className="text-warning">First time loading can take a while.</span>
      </Container>
    );
  }

  if (error) {
    return <Redirect to="/error" />;
  }

  if (!userData.token) {
    return (
      <Container className="text-center">
        <h1 className="my-5 bebas-neue-regular">Welcome to the Exercise Armory!</h1>
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
      </Container>
    );
  }
  return (
    <>
      <h1 className="text-center my-5 bebas-neue-regular">
        The Exercise Armory
      </h1>
      <div>
        <ExerciseSearch exercises={exercises} />
      </div>
    </>
  );
};

export default Home;
