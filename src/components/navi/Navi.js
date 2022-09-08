import React, { Component } from "react";
import {Link} from 'react-router-dom'
import {
    Navbar,
    NavbarBrand,
    NavbarToggler,
    Collapse,
    Nav,
    NavItem,
    NavLink
} from "reactstrap";
import CartSummary from "../carts/CartSummary";

export default class Navi extends Component {
    render() {
        return (
        <div>
            <Navbar color="light" expand="md" light>
            <NavbarBrand><Link to = '/'>Northwind</Link></NavbarBrand>
            <NavbarToggler/>
            <Collapse navbar>
                <Nav className="ms-auto" navbar>
                <NavItem>
                    <NavLink>
                        <Link to = '/saveProduct'>Add Product</Link>
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink>Github</NavLink>
                </NavItem>
                <CartSummary/>
                </Nav>
            </Collapse>
            </Navbar>
        </div>
        );
    }
}
