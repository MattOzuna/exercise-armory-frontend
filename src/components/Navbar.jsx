import { NavLink } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useContext } from "react";
import { UserContext } from "./UserContext";

function NavBar() {
  const { userData, logout } = useContext(UserContext);

  if (!userData.token) {
    return (
      <Navbar className="bg-body-tertiary" sticky="top" data-bs-theme="dark">
        <Container>
          <Nav className="me-auto">
            <NavLink className="navbar-brand" to="/">
              Home
            </NavLink>
          </Nav>

          <Nav className="justify-content-end">
            <NavLink className="nav-link" to="/login">
              Login
            </NavLink>
            <NavLink className="nav-link" to="/register">
              Sign up
            </NavLink>
          </Nav>
        </Container>
      </Navbar>
    );
  }

  return (
    <Navbar className="bg-body-tertiary w-100" sticky="top" data-bs-theme="dark">
      <Container>
        <Nav className="me-auto">
          <NavLink className="navbar-brand" to="/">
            Home
          </NavLink>
        </Nav>

        <Nav className="justify-content-end">
          <NavLink className="navbar-brand" to={`/users/${userData.username}`}>
            {userData.username}
          </NavLink>
          <Nav.Link onClick={logout}>Logout</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default NavBar;
