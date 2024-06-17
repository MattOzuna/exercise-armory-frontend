import { useParams } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import { v4 as uuidv4 } from "uuid";
import { useEffect, useState } from "react";
import Spinner from "react-bootstrap/Spinner";
import Row from "react-bootstrap/Row";

import exerciseArmoryApi from "../../api/api";
import capitilize from "../../helpers/capitilize";

const ExerciseDetails = () => {
  const { id } = useParams();
  const [exercise, setExercise] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchExercise = async (id) => {
      let res = await exerciseArmoryApi.getExercise(id);
      res.name = capitilize(res.name);
      setExercise(res);
      setIsLoading(false);
    };
    fetchExercise(id);
  }, [isLoading]);

  if (isLoading) {
    return (
      <Spinner animation="border" role="status" className="text-center">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
  }
  return (
    <Container className="my-5 w-75">
      <Row>
        <Card>
          <Card.Body>
            <Card.Title className="text-center">
              {exercise.name}
            </Card.Title>
            <div>
              <b className="mx-4">Instructions:</b>
              <ol>
                {exercise.instructions.map((instruction) => (
                  <li key={uuidv4()}>{instruction}</li>
                ))}
              </ol>
            </div>
          </Card.Body>
        </Card>
      </Row>
    </Container>
  );
};

export default ExerciseDetails;
