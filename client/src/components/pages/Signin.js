import React, {Component } from 'react';
import {findDOMNode} from 'react-dom';
import {FormControl, FormGroup, ControlLabel, Button,Grid} from 'react-bootstrap';

class Signin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            password: '',
        }
    }
    onPasswordChange = (event) => {
        this.setState({password: event.target.value})
    }

    handleSubmit() {
        const user = [{
            email: findDOMNode(this.refs.email).value,
            password: this.state.password
        }]
        console.log(user);

    }
    render(){
        return(
            <Grid>
                <h1>Sign In</h1><hr /><br />
                <FormGroup controlId="email" validationState={this.props.validation}>
                    <ControlLabel>Email</ControlLabel>
                    <FormControl
                        type="email"
                        placeholder="Enter Email"
                        ref="email" />
                    <FormControl.Feedback />
                </FormGroup>
                <FormGroup controlId="Password" validationState={this.props.validation}>
                    <ControlLabel>Password</ControlLabel>
                    <FormControl
                        onChange = {this.onPasswordChange.bind(this)}
                        type="password"
                        placeholder="Enter Password"
                        ref="password" />
                    <FormControl.Feedback />
                </FormGroup>
                <Button onClick={this.handleSubmit.bind(this)} bsStyle="primary" bsSize="small" >Sign In</Button><hr />
            </Grid>
        );

    }
}

export default Signin;