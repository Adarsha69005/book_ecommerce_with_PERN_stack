import React, {Component } from 'react';
import {findDOMNode} from 'react-dom';
import {Panel, FormControl, FormGroup, ControlLabel, Button, Col, Row, Grid} from 'react-bootstrap';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {postUser} from '../../actions/userActions';
class Login extends Component {
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
            fullname: findDOMNode(this.refs.fullname).value,
            email: findDOMNode(this.refs.email).value,
            password: this.state.password
        }]
        console.log(user);
        this.props.postUser(user);
        
    }

    render(){
        return(
            <Grid fluid>
                <Row>
                    <Col xs={12} sm={6} md={8}>
                    <div style={{margin:"100px"}}>
                        <h1>Welcome To BookShop</h1>
                        <h3> It's the one and only place for all kinds of books.</h3>
                    </div>
                    </Col>
                    <Col xs={12} sm={6} md={4}>
                            <h1>Sign Up</h1><hr />
                            <FormGroup controlId="fullname" validationState={this.props.validation}>
                                <ControlLabel>Full Name</ControlLabel>
                                <FormControl
                                    type="text"
                                    placeholder="Enter FullName"
                                    ref="fullname" />
                                <FormControl.Feedback />
                            </FormGroup>
                            <FormGroup controlId="email" validationState={this.props.validation}>
                                <ControlLabel>Email</ControlLabel>
                                <FormControl
                                    type="email"
                                    placeholder="Enter Email"
                                    ref="email" />
                                <FormControl.Feedback />
                            </FormGroup>
                            <FormGroup controlId="password" validationState={this.props.validation}>
                                <ControlLabel>Password</ControlLabel>
                                <FormControl
                                    onChange = {this.onPasswordChange.bind(this)}
                                    type="password"
                                    placeholder="Enter Password"
                                    ref="password" />
                                <FormControl.Feedback />
                            </FormGroup>
                            <Button onClick={this.handleSubmit.bind(this)} bsStyle="primary" bsSize="small" >Register</Button><hr />
                            <Panel >
                                <div>
                                    <h6 style={{display:'inline-block', marginLeft:"100px"}}>Have an account ?</h6>
                                    <Link to="/signin" > Log In</Link>
                                </div>
                            </Panel>
                    </Col>
                </Row>
            </Grid>
        );
    }
}




function mapDispatchToProps(dispatch){
    return bindActionCreators({postUser}, dispatch)
}


export default connect(null,mapDispatchToProps)(Login);