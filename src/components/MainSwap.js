import React, { useState } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { InputGroup, InputGroupAddon, Button, Input } from 'reactstrap';
import { Media, Form, FormGroup, Label, InputGroupText } from 'reactstrap';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { Modal, ModalHeader, ModalBody, ModalFooter, Spinner } from 'reactstrap';
import './MainSwap.css';
import { ArrowDown } from 'react-feather'
import {swap} from '../service/contract.js'

const BCHSLPprice = 400000
const BCHUSDprice = 530

function PresentResultOfSwap(props){
    if (props.swapStatus === 'ready'){ return (<p>PresentResultOfSwap</p>)}
    if (props.swapStatus === 'working'){ return (<Spinner size="sm" color="secondary" />)}
    return (<></>)
  }

class SwapForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = { slp: 0.0, bch: 0.0, slpusd: 0.0, bchusd: 0.0, privateKey: '',
        isModalOpen: false, setModal: false,
        swapStatus: 'ready'};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.handleChangePrivateKey = this.handleChangePrivateKey.bind(this);
    this.handleSubmitPrivateKey = this.handleSubmitPrivateKey.bind(this);
  }

  handleInputChange(event) {
      const target = event.target;
      const value = target.type === 'checkbox' ? target.checked : target.value;
      const name = target.name;
      this.setState({
        [name]: value    });
    }

  handleChange(e) {
    this.setState({ bch: e.target.value, slp: e.target.value / BCHSLPprice, bchusd: e.target.value * BCHUSDprice, slpusd: e.target.value * BCHUSDprice / BCHSLPprice });
  }

  toggleModal() {
    this.setState({
      isModalOpen: !this.state.isModalOpen
    });
  }

  handleSubmit(e) {
    e.preventDefault();

    if (this.state.slp === 0 ) {
        this.setState((state)=>{return {swapStatus : "SLP can't be 0"}});
      return;
    }
    if (this.state.privateKey === '' ) {
        this.setState((state)=>{return {swapStatus : 'no private key'}});
        this.toggleModal();
      return;
    }

    this.setState((state)=>{return {swapStatus : 'working'}});
    if ( swap(this.state.slp, this.state.bch) === false ){
        this.setState((state)=>{return {swapStatus : 'swap failed'}});
    }
    if ( swap(this.state.slp, this.state.bch) === true ){
        this.setState((state)=>{return {swapStatus : 'swap succeeded'}});
    }

  }

  handleChangePrivateKey(e) {
    this.setState({
      privateKey: e.target.value
    });

  }

  handleSubmitPrivateKey(e) {
    e.preventDefault();
    this.handleSubmit(e) ;
  }

  render() {
      return (
              <div id="mainDiv">

              <Row><Col><h4 className="SwapFormTitle">Swap</h4></Col><Col xs="auto"></Col></Row>
              <Form>
                <FormGroup row className="formGroupFrom">
                    <Row><Col>You are exchanging:</Col></Row>
                        <Row><Col>
                            <InputGroup>
                                <Input type="number" name="BCHamount" id="BCHamount" onChange={this.handleChange} value={this.state.bch} bsSize="lg" />
                                <InputGroupAddon addonType="append">
                                    <InputGroupText>BCH</InputGroupText>
                                </InputGroupAddon>
                            </InputGroup>
                        </Col></Row>
                        <Row><Col>
                            <InputGroup>
                                <Input type="number" name="BCHUSDamount" id="BCHUSDamount" bsSize="lg" value={this.state.bchusd} disabled />
                                <InputGroupAddon addonType="append">
                                    <InputGroupText>estimated USD value</InputGroupText>
                                </InputGroupAddon>
                            </InputGroup>
                        </Col></Row>
                </FormGroup>


                <ArrowDown size="18" color={'black'} />

                <FormGroup row className="formGroupTo">
                    <Row><Col>You will receive:</Col></Row>
                        <Row><Col>
                            <InputGroup>
                            <Input type="number" name="SLPamount" id="SLPamount" onChange={this.handleChange} value={this.state.slp} bsSize="lg" disabled />
                                <InputGroupAddon addonType="append">
                                  <InputGroupText>SLP</InputGroupText>
                                </InputGroupAddon></InputGroup>
                        </Col></Row>
                        <Row><Col>
                            <InputGroup>
                            <Input type="number" name="SLPUSDamount" id="SLPUSDamount" bsSize="lg" value={this.state.slpusd} disabled />
                            <InputGroupAddon addonType="append">
                              <InputGroupText>estimated USD value</InputGroupText>
                            </InputGroupAddon>
                            </InputGroup>
                        </Col></Row>
                </FormGroup>

                <Button color="success" onClick={this.handleSubmit} className="SwapButton">Start swap</Button>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                  <ModalHeader toggle={this.toggleModal}>Private key needed for the swap</ModalHeader>
                  <ModalBody>

                    <Input placeholder="Paste your private key string here" type="text" name="PrivateKey" id="PrivateKey"  onChange={this.handleChangePrivateKey} value={this.state.privateKey} bsSize="lg" />
                  </ModalBody>
                  <ModalFooter>
                    <Button color="primary" onClick={this.handleSubmitPrivateKey}>OK</Button>{' '}
                    <Button color="secondary" onClick={this.toggleModal}>Cancel</Button>
                  </ModalFooter>
                </Modal>
              </Form>
              <p>{this.swapStatus}</p>
              </div>
      );
  }
};




function MainSwap() {
  return (
        <>
                <SwapForm/>
        </>
  );
}

export default MainSwap;
