import { useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import { Link } from "react-router-dom";
import ListGroup from "react-bootstrap/ListGroup";
import { findExercises } from "../../helpers/helpers";

const ExerciseSearch = ({ exercises }) => {
  const [foundExercises, setFoundExercises] = useState([]);

  const handleChange = (e) => {
    setFoundExercises(
      e.target.value ? findExercises(exercises, e.target.value) : []
    );
  };

  return (
    <Container className="fluid w-50" data-bs-theme="dark">
      <Row>
        <input
          type="text"
          placeholder="Search for an exercise"
          onChange={handleChange}
          className="form-control rounded-pill"
        />
      </Row>
      <Row className="mx-auto pl-1">
        <ListGroup className="px-auto">
          {foundExercises.slice(0, 5).map((exercise) => (
            <ListGroup.Item key={exercise.id}>
              <Link
                to={{ pathname: `/exercises/${exercise.id}`, state: exercise }}
                className="text-decoration-none"
              >
                {exercise.name}
              </Link>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Row>
    </Container>
  );
};

export default ExerciseSearch;
