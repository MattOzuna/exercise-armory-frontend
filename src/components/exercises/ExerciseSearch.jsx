import { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Spinner from "react-bootstrap/Spinner";
import { Link } from "react-router-dom";
import ListGroup from "react-bootstrap/ListGroup";

import exerciseArmoryApi from "../../api/api";
import ExerciseAccordion from "./ExerciseAccordion";

const ExerciseSearch = () => {
  const [exercises, setExercises] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState({ name: "" });
  const [touched, setTouched] = useState(false);

  const handleChange = (e) => {
    setTouched(e.target.value ? true : false);
    setSearchTerm(e.target.value ? { name: e.target.value } : { name: "" });
    setExercises([]);
  };

  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const res = await exerciseArmoryApi.getExercises(searchTerm);
        setExercises(res);
        setIsLoading(false);
      } catch (err) {
        console.error(err);
      }
    };

    if (touched && searchTerm.name.length > 2) {
      fetchExercises();
    }
  }, [searchTerm, touched]);

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
        {isLoading && touched ? (
          <Spinner animation="border" role="status">
            {" "}
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        ) : null}
        <ListGroup>
          {exercises.map((exercise) => (
            <ListGroup.Item key={exercise.id}>
              <Link to={`/exercises/${exercise.id}`} className="text-decoration-none">{exercise.name}</Link>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Row>
    </Container>
  );
};

export default ExerciseSearch;
