import { useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import { Link } from "react-router-dom";
import ListGroup from "react-bootstrap/ListGroup";
import { capitilize, findExercises } from "../../helpers/helpers";

const ExerciseSearch = ({ exercises }) => {
  const [foundExercises, setFoundExercises] = useState([]);
  const [searchTerm, setSearchTerm] = useState({ name: "" });
  const [touched, setTouched] = useState(false);

  const handleChange = (e) => {
    setTouched(e.target.value ? true : false);
    setSearchTerm(e.target.value ? { name: e.target.value } : { name: "" });
    setFoundExercises(
      e.target.value ? findExercises(exercises, e.target.value) : []
    );
  };

  return (
    <Container className="w-50">
      <Row>
        <input
          type="text"
          placeholder="Search for an exercise"
          onChange={handleChange}
          className="form-control"
        />
      </Row>
      <Row className="justify-content-center">
        <ListGroup>
          {foundExercises.slice(0, 5).map((exercise) => (
            <ListGroup.Item key={exercise.id}>
              <Link
                to={`/exercises/${exercise.id}`}
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
