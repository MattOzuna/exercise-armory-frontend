import Accordion from "react-bootstrap/Accordion";

function ExerciseAccordionItem({ exercise }) {
  return (
    <Accordion.Item eventKey="0">
      <Accordion.Header>exercise.name</Accordion.Header>
      <Accordion.Body> exercise.target</Accordion.Body>
    </Accordion.Item>
  );
}

export default ExerciseAccordionItem;
