import { useParams } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import { v4 as uuidv4 } from "uuid";
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
    <Container className="justify-content-md-center">
      <Row>
        <Card>
          <Card.Body>
            <Card.Title>
              {exercise.name}
            </Card.Title>
              <div>
                Instructions: 
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
