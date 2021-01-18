import logo from './logo.svg';
import './App.css';
import MainSwap from './components/MainSwap'
import React, { useState } from 'react';
import { Jumbotron, Button } from 'reactstrap';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import { Container, Row, Col } from 'reactstrap';


function App(props) {

    const [collapsed, setCollapsed] = useState(true);

    const toggleNavbar = () => setCollapsed(!collapsed);


  return (
    <div className="App">

        <Jumbotron className="Jumbotron">
          <h1 className="display-3">SwapCash</h1>
          <p className="lead">The first BCH-SLP conversion app!</p>
          <hr className="my-2" />
          <p>Alpha version for testing purposes only. Use at your own peril!</p>
         </Jumbotron>

         <Container>
             <Row>
             <Col sm="12" md={{ size: 6, offset: 3 }}>

              <Navbar color="faded" light>
                <NavbarBrand className="mr-auto">Learn more:</NavbarBrand>
                <NavbarToggler onClick={toggleNavbar} className="mr-2" />
                <Collapse isOpen={!collapsed} navbar>
                  <Nav navbar>
                      <NavItem>
                        <NavLink href="./App.js">Main</NavLink>
                      </NavItem>
                    <NavItem>
                      <NavLink href="./FAQ.js">FAQ</NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink href="./Contact.js">Contact us</NavLink>
                    </NavItem>
                  </Nav>
                </Collapse>
              </Navbar>


                <Container className="themed-container container my-3 text-white mainSwapContainer" fluid="md" >
                    <Row>TEstesetlijsleijtlsijTLSIJtliesjltijeslitj</Row>
                </Container>
            </Col>
          </Row>
      </Container>



      <Jumbotron  className="Jumbotron">
        <Container><p className="lead">
        <Row>
                <Col  sm={{ size: 'auto' }}>License: MIT</Col>
                <Col sm={{ size: 'auto'}}>Created by: Burak Keceli, Ahmet Faruk and CheshireCat for the Coinparty Hackathon January 2021</Col>
                <Col sm={{ size: 'auto'}}><a href="https://github.com/serenitytomorrow/cashswap-interface"><img src="../media/github.png"></img></a></Col>
        </Row></p>
        </Container>
       </Jumbotron>
    </div>
  );
}

export default App;
