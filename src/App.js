import logo from './logo.svg';
import './App.css';
import MainSwap from './components/MainSwap'
import React, { useState } from 'react';
import { Jumbotron, Button } from 'reactstrap';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import { Container, Row, Col } from 'reactstrap';

const faq = (
    <div><h4>FAQ:</h4>
    <h5>Introduction</h5>

    <p>swap.cash is a constant product market maker built on Bitcoin Cash. We’re utilising the power of bitcoin scripting capabilities to enable automated liquidity provision across BCH-SLP pairs. swap.cash comes with a maximally Uniswap-like UX, and its functionality effectively powered by zero-conf nature of Bitcoin Cash transactions with the aim of providing low-cost and near-instant user interactions.</p>

    <h5>How It Works?</h5>

    <p>In technical standpoint, we designed a Pool Covenant that holds some amount of BCH and some amount of SLP token. The multiplication between is a constant of which the covenant enforces rules over introspection. swap.cash utilizes the x * y = k formula, where x is the amount of BCH pool holds, y is the amount of the token pool holds, and k is the fixed constant indicating the pool’s total liquidity always remain the same.</p>

    <p>The Pool Covenant inherits previous state from itself, updates and constructs new state, and continues to operate in an anyone-can-spend fashion with respective to unconfirmed transaction chain limit. swap.cash</p>
    <h5>Current Stage</h5>

    <p>As part of the CoinParty hackathon, we built a primitive version which can facilitate BCH-SLP swaps upon initial pool setup. Advanced features like adding/removing liquidity can be added later due to current limitations of the SLP protocol which supports only one type of token in one transaction (unable to support LP token apart from pair token).</p>

    <p>Please note that swap.cash is at the moment ready for testing, however rolling out for production requires Bitcoin Cash network to upgrade to larger integer support and miner validated tokens.</p>
    <h5>Addresses</h5>

    <p>We hope swap.cash demonstrates people how powerful bitcoin scripting is, and what possibilities Bitcoin Cash can open up for further applications. Feel free to shoot your CKK tokens our SLP address below.</p>

    <p>SLP address: simpleledger:qrr7ye5gtemkn6stvnfhh762g234tc4c2sqhruyr2f</p>

    <p>Cash address: bitcoincash:qrr7ye5gtemkn6stvnfhh762g234tc4c2svvg83r5h</p>
    </div>
);

const links= (
        <div><h4>Links:</h4>
        <h5>BitAuth IDE template:</h5> <p>https://t.co/0fZnYSlxoh?amp=1</p>

        <h5>GitHub repository:</h5> <p>https://github.com/serenitytomorrow/cashswap-interface</p>

        <h5>Twitter account:</h5> <p>https://twitter.com/swap_cash</p>
        <h5>Built With</h5>

            <p>bitauth
            bitcoin
            fullstack.cash
            script</p>
        </div>
);


function App(props) {

    const [collapsed, setCollapsed] = useState(true);

    const toggleNavbar = () => setCollapsed(!collapsed);


  return (
    <div className="App" id="MAIN">

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
                        <NavLink href="#MAIN">Main</NavLink>
                      </NavItem>
                    <NavItem>
                      <NavLink href="#FAQ">FAQ</NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink href="#LINKS">Links</NavLink>
                    </NavItem>
                  </Nav>
                </Collapse>
              </Navbar>


                <Container className="themed-container container my-3 text-white mainSwapContainer" fluid="md" >
                    <MainSwap/>
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

       <Container>
       <Row  id="FAQ">
        <Col  sm={{ size: 'auto' }}>{faq}
        </Col>
       </Row>
       <Row  id="LINKS">
        <Col  sm={{ size: 'auto' }}>{links}
        </Col>
       </Row>
       </Container>
    </div>
  );
}

export default App;
