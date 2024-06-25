import { useEffect, useState, useContext } from "react";
import { UserContext } from "../UserContext";
import { useParams } from "react-router-dom";
import {
  Link,
  Redirect,
  useHistory,
} from "react-router-dom/cjs/react-router-dom.min";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Spinner from "react-bootstrap/Spinner";
import Table from "react-bootstrap/Table";

import exerciseArmoryApi from "../../api/api";
import correctUser from "../../helpers/correctUser";
import { capitilize } from "../../helpers/helpers";

const WorkoutsDetails = () => {
  const history = useHistory();
  const { userData } = useContext(UserContext);
  const { username, id } = useParams();
  const [workout, setWorkout] = useState(null);
  const [formData, setFormData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  if (!correctUser(userData.username, username))
    return <Redirect to="/error" />;

  useEffect(() => {
    const getWorkout = async () => {
      try {
        const res = await exerciseArmoryApi.getWorkout(userData.username, id);
        setWorkout(res);
        setFormData((formData) => {
          res.exercises.forEach((exercise, index) => {
            formData[index] = {};
            formData[index].exerciseId = exercise.id;
            formData[index].reps = exercise.reps;
            formData[index].sets = exercise.sets;
            formData[index].weight =
              exercise.weight === null ? 0 : exercise.weight;
          });
          return formData;
        });
        setIsLoading(false);
      } catch (err) {
        history.push("/error");
      }
    };

    if (isLoading) getWorkout();
  }, [isLoading]);

  const handleChange = (e) => {
    //change the value of the form data to a number
    //and set form data to the new value
    const [index, name] = e.target.name.split("-");
    setFormData((formData) => ({
      ...formData,
      [index]: { ...formData[index], [name]: Number(e.target.value) },
    }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const data = Array.from(Object.values(formData));
    await exerciseArmoryApi.updateWorkoutExercises(userData.username, id, {
      exercises: data,
    });
    setIsLoading(true);
  };

  const handleDeleteWorkout = async (e) => {
    e.preventDefault();
    await exerciseArmoryApi.deleteWorkout(userData.username, id);
    history.push(`/users/${userData.username}`);
  };

  const handleDeleteExercise = async (e) => {
    e.preventDefault();
    const exerciseId = +e.target.id;
    const newExercises = workout.exercises
      .filter((exercise) => exercise.id !== exerciseId)
      .map((exercise) => exercise.id);
    await exerciseArmoryApi.editExerciseToWorkout(userData.username, id, {
      exercises: newExercises,
    });
    setIsLoading(true);
  };

  if (isLoading) {
    return (
      <Container className="my-5 w-75 text-center">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Container>
    );
  }

  return (
    <Container className="my-5 w-75">
      <Row>
        <h1 className="text-center bebas-neue-regular fs-2">
          Workout: {workout.date}
        </h1>
        <Table>
          <thead className="bebas-neue-regular fs-5">
            <tr>
              <th>#</th>
              <th>Exercise</th>
              <th>Weight (lbs)</th>
              <th>Reps</th>
              <th>Sets</th>
            </tr>
          </thead>
          <tbody>
            {workout.exercises.map((exercise, index) => (
              <tr key={exercise.id + "-inputs"}>
                <th>{index + 1}</th>
                <td>
                  <Link
                    to={{
                      pathname: `/exercises/${exercise.id}`,
                      state: exercise,
                    }}
                  >
                    {capitilize(exercise.name)}
                  </Link>
                </td>
                <td>
                  <input
                    type="number"
                    value={formData[index].weight}
                    name={index + "-weight"}
                    onChange={handleChange}
                    className="form-control"
                  />
                </td>
                <td>
                  <input
                    type="number"
                    value={formData[index].reps}
                    name={index + "-reps"}
                    onChange={handleChange}
                    className="form-control"
                  />
                </td>
                <td>
                  <input
                    type="number"
                    value={formData[index].sets}
                    name={index + "-sets"}
                    onChange={handleChange}
                    className="form-control"
                  />
                </td>
                <td>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={handleDeleteExercise}
                    id={exercise.id}
                  >
                    X
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Row>
      <div className="text-center">
        <button className="btn btn-danger mx-5" onClick={handleDeleteWorkout}>
          Delete
        </button>
        <Link
          className="btn btn-danger"
          to={`/users/${username}/workouts/${id}/exercises`}
        >
          Add Exercises
        </Link>
        <button className="btn btn-primary mx-5" onClick={handleSave}>
          Save
        </button>
      </div>
    </Container>
  );
};

export default WorkoutsDetails;
