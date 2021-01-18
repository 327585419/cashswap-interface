// import logo from './logo.svg';
// import './App.css';
// import MainSwap from './components/MainSwap'
// import React, { useState } from 'react';
// import { Jumbotron, Button } from 'reactstrap';
// import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
// import { Container, Row, Col } from 'reactstrap';

// function App(props) {

//     const [collapsed, setCollapsed] = useState(true);

//     const toggleNavbar = () => setCollapsed(!collapsed);

//   return (
//     <div className="App">

//         <Jumbotron className="Jumbotron">
//           <h1 className="display-3">CashSwap</h1>
//           <p className="lead">The first BCH-SLP conversion app!</p>
//           <hr className="my-2" />
//           <p>Alpha version for testing purposes only. Use at your own peril!</p>
//           <p className="lead">
//             <Button color="primary">Learn More</Button>
//           </p>
//          </Jumbotron>

//          <Container>
//              <Row>
//              <Col sm="12" md={{ size: 6, offset: 3 }}>

//       <Navbar color="faded" light>
//         <NavbarBrand href="/" className="mr-auto">Contents:</NavbarBrand>
//         <NavbarToggler onClick={toggleNavbar} className="mr-2" />
//         <Collapse isOpen={!collapsed} navbar>
//           <Nav navbar>
//             <NavItem>
//               <NavLink href="/components/">Components</NavLink>
//             </NavItem>
//             <NavItem>
//               <NavLink href="https://github.com/reactstrap/reactstrap">GitHub</NavLink>
//             </NavItem>
//           </Nav>
//         </Collapse>
//       </Navbar>

//                 <Container className="themed-container container my-3 text-white mainSwapContainer" fluid="md" >
//                     <MainSwap/>
//                 </Container>
//             </Col>
//           </Row>
//       </Container>

//       <Jumbotron  className="Jumbotron">
//         <Container fluid="xl">
//             <Row xs="2">
//                 <p className="lead">
//                     <Col  sm={{ size: 'auto', offset: 1 }}>License: MIT</Col>
//                     <Col sm={{ size: 'auto', offset: 1 }}>Created by: two guys and a cat</Col>
//                 </p>
//             </Row>
//         </Container>
//        </Jumbotron>
//     </div>
//   );
// }

// export default App;
