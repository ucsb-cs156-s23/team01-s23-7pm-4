import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function AppNavbar() {
  return (
    <>
      <Navbar expand="xl" variant="dark" bg="dark" sticky="top" data-testid="AppNavbar">
        <Container>
          <Navbar.Brand as={Link} to="/">
            Example
          </Navbar.Brand>

          <Navbar.Toggle />

          <>
            {/* be sure that each NavDropdown has a unique id and data-testid */}
          </>

          <Navbar.Collapse>
            {/* This `nav` component contains all navigation items that show up on the left side */}
            <Nav className="me-auto">
              <NavDropdown title="Menu 1" id="appnavbar-menu1" data-testid="appnavbar-menu1" >
                <NavDropdown.Item as={Link} to="/menu1/optionA">Option A</NavDropdown.Item>
              </NavDropdown>
              <NavDropdown title="Menu 2" id="appnavbar-menu2" data-testid="appnavbar-menu2" >
                <NavDropdown.Item as={Link} to="/menu2/optionA">Option A</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/menu2/optionB">Option B</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container >
      </Navbar >
    </>
  );
}
