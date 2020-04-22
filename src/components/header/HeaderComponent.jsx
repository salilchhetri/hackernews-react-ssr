import React from 'react';
import { Navbar, Nav } from 'react-bootstrap'
import Image from 'react-bootstrap/Image'
import logo from '../../assets/img/hn-logo.png';
import "./HeaderComponent.scss";

export default function HeaderComponent() {
    return (
        <Navbar collapseOnSelect expand="lg" bg="primary" variant="light">
            <Navbar.Brand href="#home">
                <Image src={logo} fluid />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link href="#top">top</Nav.Link>
                    <Nav.Link href="#new">new</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}
