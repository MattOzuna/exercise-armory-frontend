import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import {
  Link,
  Redirect,
  useHistory,
} from "react-router-dom/cjs/react-router-dom.min";
import { UserContext } from "../UserContext";

import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Spinner from "react-bootstrap/Spinner";

import exerciseArmoryApi from "../../api/api";
import correctUser from "../../helpers/correctUser";

const UserDetails = () => {
  const history = useHistory();
  const { username } = useParams();
  const { userData } = useContext(UserContext);
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  if (!correctUser(userData.username, username))
    return <Redirect to="/error" />;

  useEffect(() => {
    const fetchUser = async () => {
      try {
        let res = await exerciseArmoryApi.getUser(username);
        setUser(res);
      } catch (err) {
        history.push("/error");
      }
    };
    if (isLoading) {
      fetchUser();
      setIsLoading(false);
    }
  }, [isLoading]);

  const handleAddWorkout = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      await exerciseArmoryApi.createWorkout(username, {});
    } catch (err) {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <Container className="my-5 w-75 text-center">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Container>
    );
  }

  return (
    <Container className="my-5 w-75">
      <Row>
        <Card>
          <Card.Body>
            <Card.Title className="text-center bebas-neue-regular fs-2">
              {user.username}
            </Card.Title>
            <div className="justify-content-center">
              <b className="mx-4 bebas-neue-regular fs-4">First Name:</b>
              <span>{user.firstName}</span>
            </div>
            <div>
              <b className="mx-4 bebas-neue-regular fs-4">Last Name:</b>
              <span>{user.lastName}</span>
            </div>
            <div>
              <b className="mx-4 bebas-neue-regular fs-4">Email:</b>
              <span>{user.email}</span>
            </div>
            <div>
              <div className="">
                <b className="mx-4 bebas-neue-regular fs-4">Workouts:</b>
              </div>
              <div className="">
                {user.workouts ? (
                  <ul className="">
                    {user.workouts.map((workout) => (
                      <li key={uuidv4()}>
                        <Link to={`/users/${username}/workouts/${workout.id}`}>
                          {workout.date.split("T")[0]}
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : null}
                <div className="text-center">
                  <button className="btn btn-danger" onClick={handleAddWorkout}>
                    Add Workout
                  </button>
                </div>
              </div>
            </div>
          </Card.Body>
        </Card>
      </Row>
    </Container>
  );
};

export default UserDetails;
