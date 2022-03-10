import { useState } from "react";
import { post } from "axios";
import { Button, Container, Col, Row, InputGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

const Register2 = () => {
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [password2, setPassword2] = useState();
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();

  const [validated, setValidated] = useState(false);

  const submit = () => {
    post("http://127.0.0.1:8000/api/Register", {
      username: username,
      email: email,
      password: password,
      first_name: firstName,
      last_name: lastName,
      password2: password2,
    })
      .then(function (response) {
        console.log(response);


        MySwal.fire({
            icon: "success",
            title: "Ok!",
            text: 'Usuario creado',
        });
      })
      .catch(function (error) {
        const data = error.response.data;
        let message = '';
        
        for (const property in data) {
          console.log(`${property}: ${data[property]}`);
          message = message + ' ' + `${property}: ${data[property]}`;
        }

        MySwal.fire({
            icon: "error",
            title: "Oops...",
            text: message,
        });
      });
  };

  const handleSubmit = (event) => {
    const form = event.currentTarget;
   
    if (form.checkValidity() === true) {
      submit();
      console.log(form);
    }
    event.preventDefault();
    event.stopPropagation();
    setValidated(true);
  };

  return (
    <>
      {/*<input type="text" id="username"></input>
          <input type="text" id="password"></input> */}

      <h3>Register</h3>
      <Container>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Row>
            <Form.Group as={Col} className="mb-3" controlId="formBasicEmail">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Username"
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group as={Col} className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="Email"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>
          </Row>

          <Row>
            <Form.Group as={Col} className="mb-3" controlId="formBasicPassword">
              <Form.Label>Nombres</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nombres"
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group as={Col} className="mb-3" controlId="formBasicPassword">
              <Form.Label>Apellidos</Form.Label>
              <Form.Control
                type="text"
                placeholder="Password"
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </Form.Group>
          </Row>

          <Row>
            <Form.Group as={Col} className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group as={Col} className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password Confirmar</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password confirmar"
                onChange={(e) => setPassword2(e.target.value)}
                required
              />
            </Form.Group>
          </Row>

          <Button variant="primary" type="submit">
            Register
          </Button>
          <Link to="/login" className="ms-3 btn btn-success">
            Login
          </Link>
        </Form>
      </Container>
    </>
  );
};

export default Register2;
