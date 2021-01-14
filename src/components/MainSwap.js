import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import { InputGroup, InputGroupAddon, Button, Input } from 'reactstrap';
import { Media, Form, FormGroup, Label } from 'reactstrap';



class SwapForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {slp: 0, bch: 0, slpusd: 0, bchusd: 0 };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({ bch: e.target.value, slp: e.target.value / 400000, bchusd: e.target.value * 530, slpusd: e.target.value * 530 / 400000 });
  }

  handleSubmit(e) {
    e.preventDefault();
    if (this.state.text.length === 0) {
      return;
    }
    const newItem = {
      text: this.state.text,
      id: Date.now()
    };
    this.setState(state => ({
      items: state.items.concat(newItem),
      text: ''
    }));
  }

  render() {
      return (

              <div>
              <Form onSubmit={this.handleSubmit}>
                <FormGroup row>
                    You are exchanging:
                  <Col sm={10}>
                    <Input type="text" name="BCHamount" id="BCHamount" onChange={this.handleChange} value={this.state.bch} bsSize="lg" /><Label for="BCHamount" sm={2} size="lg">BCH</Label>
                    <Input type="text" name="BCHUSDamount" id="BCHUSDamount" bsSize="lg" value={this.state.bchusd} /><Label for="BCHUSDamount" sm={2} size="lg">USD</Label>
                  </Col>

                </FormGroup>

                <FormGroup row>
                    You will receive:
                  <Col sm={10}>
                    <Input type="text" name="SLPamount" id="SLPamount" bsSize="lg" value={this.state.slp} /><Label for="SLP" sm={2} size="lg">SLP</Label>
                    <Input type="text" name="SLPUSDamount" id="SLPUSDamount" bsSize="lg" value={this.state.slpusd} /><Label for="SLPUSDamount" sm={2} size="lg">USD</Label>
                  </Col>
                </FormGroup>
                <Button>Exchange</Button>
              </Form>
              </div>
      );
  }
};


function MainSwap() {
  return (
      <Container>
          <Row>
            <Col sm="12" md={{ size: 6, offset: 3 }}>
                <SwapForm/>
            </Col>
          </Row>
      </Container>
  );
}

export default MainSwap;
