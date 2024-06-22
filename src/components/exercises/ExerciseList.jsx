import { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import ListGroup from "react-bootstrap/ListGroup";
import { findExercises } from "../../helpers/helpers";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useParams } from "react-router-dom";

import exerciseArmoryApi from "../../api/api";
import ExerciseCard from "./ExerciseCard";

const ExerciseList = () => {
  const history = useHistory();
  const { username, id } = useParams();
  const [exercises, setExercises] = useState([]);
  const [foundExercises, setFoundExercises] = useState([]);
  const [workoutExercises, setWorkoutExercises] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const res = await exerciseArmoryApi.getExercises();
        const user = await exerciseArmoryApi.getUser(username);
        const workout = user.workouts.find((w) => w.id === +id);
        setWorkoutExercises(workout.exercises.map((id) => +id));
        setExercises(res);
        setIsLoading(false);
      } catch (err) {
        history.push("/error");
      }
    };
    if (isLoading) {
      fetchExercises();
    }
  }, [isLoading]);

  const handleChange = (e) => {
    setFoundExercises(
      e.target.value.length > 2
        ? findExercises(exercises, e.target.value, workoutExercises)
        : []
    );
  };

  const add = async ({ exercise }) => {
    try {
      const exercises = [...workoutExercises, exercise.id];
      //send the new array to the backend
      await exerciseArmoryApi.editExerciseToWorkout(username, id, {
        exercises,
      });
      history.push(`/users/${username}/workouts/${id}`);
    } catch (err) {
      history.push("/error");
    }
  };

  return (
    <>
      <Container className="w-50">
        <Row>
          <div className="text-center my-4">
            <h2 className="bebas-neue-regular">Find an Exercise</h2>
          </div>
          <input
            type="text"
            placeholder="Search for an exercise"
            onChange={handleChange}
            className="form-control rounded-pill"
          />
        </Row>
      </Container>
      <Container className="w-75">
        <Row className="justify-content-center">
          <ListGroup>
            {foundExercises.map((exercise) => (
              <ExerciseCard key={exercise.id} exercise={exercise} add={add} />
            ))}
          </ListGroup>
        </Row>
      </Container>
    </>
  );
};

export default ExerciseList;
