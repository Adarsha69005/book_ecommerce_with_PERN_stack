import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {Nav, NavItem, Navbar, Badge} from 'react-bootstrap';

class Menu extends Component {
    render() {
        return (
            <Navbar inverse fixedTop collapseOnSelect>
                <Navbar.Header>
                  <Navbar.Brand>
                    <a href="/booklist">Book Shop</a>
                  </Navbar.Brand>
                  <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                  <Nav>
                    <NavItem eventKey={1} componentClass={Link} href="/about" to="/about">
                      About
                    </NavItem>
                    <NavItem eventKey={2} componentClass={Link} href="/contacts" to="/contacts">
                      Contact Us
                    </NavItem>
                  </Nav>
                  <Nav pullRight>
                    <NavItem eventKey={1} componentClass={Link} href="/admin" to="/admin">
                      Admin
                    </NavItem>
                    <NavItem eventKey={2} componentClass={Link} href="/cart" to="/cart">
                      Your Cart { (this.props.cartItemsNumber > 0)?(<Badge className="badge">{this.props.cartItemsNumber}</Badge>):('')}
                    </NavItem>
                  </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}


export default Menu;