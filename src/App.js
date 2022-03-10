import "./App.css";
import background from "./assets/bg-img.jpg";
import * as React from "react";
import Register from "./components/Register";
import Login from "./components/Login";
import Profile from "./components/Profile";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Routes,
  useLocation,
  Navigate
} from "react-router-dom";
import Register2 from "./components/Register2";

function App() {
  return (
    <div className="App" style={{ backgroundImage: `url(${background})`, height:'100vh'}} >
      <Router>
        <Routes>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register2/>}/>
          <Route path="/profile:id" element={<Register2/>}/>
          <Route
            path="/profile"
            element={
              <Profile/>
            }
          />
        </Routes>
      </Router>
    </div>
  );
}


export default App;
