import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import exerciseArmoryApi from "../../api/api";
import Spinner from "react-bootstrap/Spinner";
import { useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { v4 as uuidv4 } from "uuid";

const LoginForm = ({ login }) => {
  const history = useHistory();
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

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
      let res = await exerciseArmoryApi.login(formData);
      await login(res, formData.username);
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
    <div className="w-50 mx-auto text-center">
      <Form onSubmit={handleSubmit}>
        <h2 className="my-4 bebas-neue-regular">Login</h2>
        {errors.map((error) => (
          <div className="text-danger" key={uuidv4()}>
            {error}
          </div>
        ))}
        <Form.Group className="mb-3" controlId="username">
          <Form.Label>Username</Form.Label>
          <Form.Control
            required
            type="text"
            name="username"
            placeholder="Enter Username"
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            required
            minLength="5"
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Login
        </Button>
      </Form>
    </div>
  );
};

export default LoginForm;
