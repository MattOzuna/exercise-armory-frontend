import Accordion from "react-bootstrap/Accordion";
import { Link } from "react-router-dom";

import { v4 as uuidv4 } from "uuid";

function ExerciseAccordion({ exercises }) {
  return (
    <Accordion>
      {exercises.map((exercise) => {
        const key = uuidv4();
        return (
          <Accordion.Item eventKey={key} key={key}>
            <Accordion.Header>{exercise.name}</Accordion.Header>
            <Accordion.Body>
                <div><b>Target Muscle: </b>{exercise.target}</div>
                <div><b>Equipment: </b>{exercise.equipment}</div>
                <div>
                  <Link to={`/exercises/${exercise.id}`}>More Info</Link>
                </div>
            </Accordion.Body>
          </Accordion.Item>
        );
      })}
    </Accordion>
  );
}

export default ExerciseAccordion;
