import { useParams} from "react-router-dom";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import { useEffect, useState } from "react";
import Spinner from "react-bootstrap/Spinner";
import Row from "react-bootstrap/Row";

import exerciseArmoryApi from "../../api/api";


const ExerciseDetails = () => {
  const { id } = useParams();
  const [exercise, setExercise] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchExercise = async (id) => {
      let res = await exerciseArmoryApi.getExercise(id);
      setExercise(res);
      setIsLoading(false);
    };
    fetchExercise(id);
  }, [isLoading]);

  if (isLoading) {
    return (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
  }
  return (
    <Container className="justify-content-md-center align-content-md-center">
      <Row>
        <Card>
          <Card.Body>
            <Card.Img variant="left" src={exercise.gifUrl}></Card.Img>
            <Card.Title>{exercise.name}</Card.Title>
            <Card.Text>{exercise.target}</Card.Text>
          </Card.Body>
        </Card>
      </Row>
    </Container>
  );
};

export default ExerciseDetails;
