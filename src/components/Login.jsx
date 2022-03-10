import { useState } from "react";
import { post } from "axios";
import { Button, Container } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

function Login() {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [validated, setValidated] = useState(false);

  const submit = () => {
    post("http://127.0.0.1:8000/api/v2/Auth2/", {
      username: username,
      password: password,
    })
      .then(function (response) {
        console.log(response.data.refresh);
        localStorage.setItem("token", response.data.access);
        localStorage.setItem("refesh", response.data.refresh);

        const base64Url = response.data.access.split('.')[1];
        const base64 = base64Url.replace('-', '+').replace('_', '/');
        localStorage.setItem("user_id", JSON.parse(window.atob(base64)).user_id);



        window.location.replace("http://127.0.0.1:3000/profile");
      })
      .catch(function (error) {
        const data = error.response.data;
        let message = '';

        for (const property in data) {
          console.log(`${property}: ${data[property]}`);
          message = message + " " + `${property}: ${data[property]}`;
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

      <h3>Login</h3>
      <Container>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Username"
              required
              onChange={(e) => setUsername(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Guardar
          </Button>
          <Link to="/register" className="ms-3 btn btn-success">
            Register
          </Link>
        </Form>
      </Container>
    </>
  );
}

export default Login;
