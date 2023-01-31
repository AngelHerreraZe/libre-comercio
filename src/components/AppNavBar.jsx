import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const AppNavBar = () => {
    const logout = () => {
        localStorage.removeItem("token")
    }

    return (
        <div>
            <Navbar fixed="top" className="navbar navbar-expand-lg navbar-light bg-light fullscreen" expand="md">
                <Container>
                    <Navbar.Brand className='navbar-title' as={Link} to="/">Libre Mercadeo</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-auto">
                            <Nav.Link as={Link} to="/login">Login</Nav.Link>
                            <Nav.Link as={Link} to="/purchases">Purchases</Nav.Link>
                            <Nav.Link>Cart</Nav.Link>
                            <Nav.Link onClick={logout}>LOG OUT</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    );
};

export default AppNavBar;