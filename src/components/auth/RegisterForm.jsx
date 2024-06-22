import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import exerciseArmoryApi from "../../api/api";
import Spinner from "react-bootstrap/Spinner";
import { useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { v4 as uuidv4 } from "uuid";

const RegisterForm = ({ register }) => {
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();

  const handleChange = (e) => {
    setFormData((formData) => ({
      ...formData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      let res = await exerciseArmoryApi.registerNewUser(formData);
      await register(res, formData.username);
      history.push("/");
    } catch (err) {
      setIsLoading(false);
      setErrors(err.message ? ["Unkown Issue. Try again later."] : err);
    }
  };

  if (isLoading) {
    return (
      <div className="w-50 mx-auto text-center">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  return (
    <div className="w-50 mx-auto text-center my-5">
      <Form onSubmit={handleSubmit}>
        <h2 className="my-4 bebas-neue-regular">Sign up</h2>
        {errors.map((error) => (
          <div className="text-danger" key={uuidv4()}>
            {error}
          </div>
        ))}
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email address:</Form.Label>
          <Form.Control
            required
            name="email"
            type="email"
            placeholder="name@example.com"
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-3 mx-auto" controlId="username">
          <Form.Label>Username:</Form.Label>
          <Form.Control
            required
            name="username"
            type="text"
            placeholder="Username"
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-3 mx-auto" controlId="password">
          <Form.Label>Password:</Form.Label>
          <Form.Control
            required
            minLength="5"
            name="password"
            type="password"
            placeholder="Password"
            onChange={handleChange}
          />
        </Form.Group>
        <Row>
          <Col>
            <Form.Group className="mb-3 mx-auto" controlId="firstName">
              <Form.Label>First Name:</Form.Label>
              <Form.Control
                required
                name="firstName"
                type="text"
                placeholder="First Name"
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3 mx-auto" controlId="lastName">
              <Form.Label>Last Name:</Form.Label>
              <Form.Control
                required
                name="lastName"
                type="text"
                placeholder="Last Name"
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
        </Row>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default RegisterForm;
