import { useState, useEffect } from "react";
import defaul_img from "./../assets/default_img.png";
import { post, get, put } from "axios";
import { Button, Container, Col, Row } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

const Profile = () => {
  const [pathImg, setPathImg] = useState();
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [validated, setValidated] = useState(false);

  useEffect(() => {
    user();
    getImg();
  }, []);



  function sendMessage(error) {
    const data = error.response.data;
    let message = "";

    for (const property in data) {
      console.log(`${property}: ${data[property]}`);
      message = message + " " + `${property}: ${data[property]}`;
    }

    MySwal.fire({
      icon: "error",
      title: "Oops...",
      text: message,
    });
  }

  const user = () => {
    get(
      "http://127.0.0.1:8000/api/Profile/v1/user/" +
        localStorage.getItem("user_id") +
        "/",
      {
        headers: {
          Authorization: `Bearer ` + localStorage.getItem("token"),
        },
      }
    )
      .then(function (response) {
        setUsername(response.data.data.username);
        setEmail(response.data.data.email);
        setFirstName(response.data.data.first_name);
        setLastName(response.data.data.last_name);
      })
      .catch(function (error) {
        console.log(error.response);
      });
  };

  const getImg = () => {
    get(
      "http://127.0.0.1:8000/api/Profile/v1/profile/" +
        localStorage.getItem("user_id") +
        "/",
      {
        headers: {
          Authorization: `Bearer ` + localStorage.getItem("token"),
        },
      }
    )
      .then(function (response) {
        setPathImg("http://127.0.0.1:8000" + response.data.data.name_img);
        console.log("data", pathImg);
      })
      .catch(function (error) {
        console.log("error", error.response.data);
        setPathImg(defaul_img);
      });
  };

  const submit = () => {
    put(
      "http://127.0.0.1:8000/api/Profile/v1/user/" +
        localStorage.getItem("user_id") +
        "/",
      {
        username: username,
        email: email,
        first_name: firstName,
        last_name: lastName,
      },
      {
        headers: {
          Authorization: `Bearer ` + localStorage.getItem("token"),
        },
      }
    )
      .then(function (response) {
        console.log(response);

        MySwal.fire({
          icon: "success",
          title: "Ok!",
          text: "Usuario Actualizado",
        });
      })
      .catch(function (error) {
        sendMessage(error);
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

  const SubmitImg = (event) => {
    console.log("evento", event);
    let data = new FormData();
    data.append("name_img", event);
    data.append("user", localStorage.getItem("user_id"));
    post(
      "http://127.0.0.1:8000/api/Profile/v1/profile/" +
        localStorage.getItem("user_id") +
        "/",
      data,
      {
        headers: {
          Authorization: `Bearer ` + localStorage.getItem("token"),
          "Content-type": "multipart/form-data",
        },
      }
    )
      .then(function (response) {
        setPathImg("http://127.0.0.1:8000" + response.data.data.name_img);

        MySwal.fire({
          icon: "success",
          title: "Ok!",
          text: "Usuario Actualizado",
        });
      })
      .catch(function (error) {
        sendMessage(error);
      });
  };

  return (
    <div className="container">
      <br />
      <br />
      <Container
        className="rounded"
        style={{ width: "70%", backgroundColor: "#fff6ed" }}
      >
        <br></br>

        <Row>
          <Col md="4"></Col>
          <Col lg="4" md="2" className="mb-4">
            <img src={pathImg} className="img-fluid rounded-circle" alt="" />
          </Col>
          <Col md="4">
            <Form.Group controlId="formFileSm" className="mb-3">
              <Form.Label>Cambia tu foto de perfil</Form.Label>
              <Form.Control
                type="file"
                size="sm"
                onChange={(e) => SubmitImg(e.target.files[0])}
              />
            </Form.Group>
          </Col>
        </Row>

        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Row>
            <Form.Group as={Col} className="mb-3" controlId="formBasicEmail">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Username"
                onChange={(e) => setUsername(e.target.value)}
                defaultValue={username}
              />
            </Form.Group>
            <Form.Group as={Col} className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="Email"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
                defaultValue={email}
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
                defaultValue={firstName}
              />
            </Form.Group>
            <Form.Group as={Col} className="mb-3" controlId="formBasicPassword">
              <Form.Label>Apellidos</Form.Label>
              <Form.Control
                type="text"
                placeholder="Apellidos"
                onChange={(e) => setLastName(e.target.value)}
                defaultValue={lastName}
              />
            </Form.Group>
          </Row>

          <Button variant="primary" type="submit">
            Actualizar
          </Button>
          <Link to="/login" className="ms-3 btn btn-danger">
            Salir
          </Link>
        </Form>
        <br></br>
      </Container>
    </div>
  );
};

export default Profile;
