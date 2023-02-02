import React, { useState } from 'react';
import { Button, Container, Nav, Navbar, Offcanvas } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import CartSidebar from './CartSidebar';

const AppNavBar = () => {

    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem("token")
        alert("Sesión cerrada correctamente")
        navigate("/")
    }

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <div>

                <Navbar fixed="top" className="navbar navbar-expand-lg navbar-light bg-light fullscreen" expand="md">
                    <Container>
                        <Navbar.Brand className='navbar-title' as={Link} to="/">Libre Mercadeo</Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="ms-auto">
                                <Nav.Link as={Link} to="/login">Login</Nav.Link>
                                <Nav.Link as={Link} to="/purchases">Purchases</Nav.Link>
                                <Nav.Link onClick={handleShow}>Cart</Nav.Link>
                                <Nav.Link onClick={logout}>LOG OUT</Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </div>
            <CartSidebar show={show} handleClose={handleClose}/>
        </>
    );
};

export default AppNavBar;