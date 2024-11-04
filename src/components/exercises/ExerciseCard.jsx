import Card from "react-bootstrap/Card";
import { capitilize } from "../../helpers/helpers";
import { v4 as uuidv4 } from "uuid";

const ExerciseCard = ({ exercise, add=null }) => {
  return (
    <Card className="my-2" data-bs-theme="dark">
      <Card.Body>
        <Card.Title className="text-center bebas-neue-regular fs-2">
          {exercise.name}
        </Card.Title>
        <div>
          <b className="ms-4 me-2 bebas-neue-regular fs-4">Target Muscles: </b>
          {capitilize(exercise.target) +
            ", " +
            capitilize(exercise.secondaryMuscles.join(", "))}
        </div>
        <div>
          <b className="mx-4 bebas-neue-regular fs-4">Instructions:</b>
          <ol>
            {exercise.instructions.map((instruction) => (
              <li key={uuidv4()}>{instruction}</li>
            ))}
          </ol>
        </div>
        {add ? (
          <button
            className="btn btn-danger"
            onClick={() => add({exercise})}
          >
            Add to Workout
          </button>
        ) : null}
      </Card.Body>
    </Card>
  );
};

export default ExerciseCard;
