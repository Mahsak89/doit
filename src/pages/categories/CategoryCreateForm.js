import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import { useHistory } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";
import styles from "../../styles/CategoryCreateEditForm.module.css";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";

function CategoryCreateForm() {
  const [errors, setErrors] = useState({});
  const [name, setName] = useState("");

  const history = useHistory();

  const handleChange = (event) => {
    setName(event.target.value);
    
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await axiosReq.post("/categories/", { name });
      history.push(`/categories/${data.id}`);
    } catch (err) {
      if (err.response?.status !== 401) {
        setErrors(err.response?.data);
      }
    }
  };

  return (
  
    <Container
            className={`${appStyles.Content} ${styles.Container} d-flex flex-column justify-content-center`}
          >
            <h3 className={` ${styles.Header} mb-2`}> Add a category</h3>
        <Form onSubmit={handleSubmit}>
            <Form.Label className="mb-3">Name :</Form.Label>
            <Form.Control 
                className="mb-5"
                type="text"
                value={name}
                onChange={handleChange}
            />
            {errors?.name?.map((message, idx) => (
                <Alert variant="warning" key={idx}>
                {message}
                </Alert>
            ))}
            <Button
                className={`${btnStyles.Button} ${btnStyles.Blue}`}
                onClick={() => history.goBack()}
            >
                cancel
            </Button>
            <Button className={`${btnStyles.Button} ${btnStyles.Blue} `} type="submit">
                create
            </Button>
        </Form>

    </Container>








   
    
  );
}

export default CategoryCreateForm;