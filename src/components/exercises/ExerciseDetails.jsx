import { useLocation, Redirect } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

import ExerciseCard from "./ExerciseCard";
// import { useParams } from "react-router-dom/cjs/react-router-dom.min";
// import { useEffect, useState } from "react";
// import Spinner from "react-bootstrap/Spinner";

// import exerciseArmoryApi from "../../api/api";
// import { capitilize } from "../../helpers/helpers";

const ExerciseDetails = () => {
  const { state } = useLocation();

  //This is code for each exercise route making it own API call
  
  // const { id } = useParams();
  // const [exercise, setExercise] = useState({});
  // const [isLoading, setIsLoading] = useState(true);

  // useEffect(() => {
  //   const fetchExercise = async (id) => {
  //     let res = await exerciseArmoryApi.getExercise(id);
  //     res.name = capitilize(res.name);
  //     setExercise(res);
  //     setIsLoading(false);
  //   };
  //   fetchExercise(id);
  // }, [isLoading]);

  // if(isLoading){
  //   return (
  //     <Container className="w-50 text-center my-5">
  //       <Spinner animation="border" role="status">
  //         {" "}
  //         <span className="visually-hidden">Loading...</span>
  //       </Spinner>
  //     </Container>
  //   );
  // }

  if (!state) {
    return <Redirect to="/" />;
  }

  return (
    <Container className="my-5 w-75">
      <Row>
        <ExerciseCard exercise={state} />
      </Row>
    </Container>
  );
};

export default ExerciseDetails;
