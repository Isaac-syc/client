import { useState } from "react";
import { post } from "axios";
import { Button, Container } from "react-bootstrap";
import Form from "react-bootstrap/Form";

function Register() {
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const submit = () => {
    post("http://127.0.0.1:8000/api/Register", {
      username: username,
      email: email,
      password: password,
    })
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <>
      {/*<input type="text" id="username"></input>
          <input type="text" id="password"></input> */}

      <h3>Register</h3>
      <Container>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Username"
              onChange={(e) => setUsername(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="Email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Button variant="primary" onClick={() => submit()}>
            Register
          </Button>
        </Form>
      </Container>
    </>
  );
}

export default Register;
