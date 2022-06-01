import React, { Component } from 'react'
import { Navbar,Nav} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';

export class Header extends Component{
    render(){
        return (
            <Navbar bg="light" variant="light" id="navBar">
                <Navbar.Brand >트하!</Navbar.Brand>
                <Nav className="mr-auto">
                    <Nav.Link href="/search" id="LoginButton">분석하기</Nav.Link>
                    <Nav.Link href="/analysis" id="SignupButton">분석기록보기</Nav.Link>
                </Nav>
            </Navbar>
        );
    }
}

export default Header;