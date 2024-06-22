import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import exerciseArmoryApi from "../../api/api";
import Spinner from "react-bootstrap/Spinner";
import { useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { v4 as uuidv4 } from "uuid";

const WorkoutsNewForm = ({ username }) => {
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
    <div>test</div>
  )
};

export default WorkoutsNewForm;
