import React, {Component} from 'react';
import {Row, Col, Well, Button, Image} from 'react-bootstrap';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {addToCart, updateCart} from '../../actions/cartActions';

class BookItem extends Component {
    constructor(){
        super();
        this.state ={
            isClicked: false
        };
    }
    onReadMore(){
        this.setState({isClicked:true})
    }

    handleCart() {
        const book = [...this.props.cart, {
            id: this.props.id,
            title: this.props.title,
            description: this.props.description,
            images: this.props.images,
            price: this.props.price,
            quantity:1
        }]

        if(this.props.cart.length > 0){
            let id = this.props.id;
            let cartIndex = this.props.cart.findIndex(cart => cart.id === id)
            if(cartIndex === -1) {
                this.props.addToCart(book);
            } else {
                this.props.updateCart(id, 1, this.props.cart);
            }
        } else {
            this.props.addToCart(book);
        }
        
    }
    render() {
        return (
            <Well style={{backgroundColor:"#666633"}}>
                 <Row>
                    <Col xs={12} sm={4} md={6}>
                        <Image src={this.props.images} responsive/>
                    </Col>
                    <Col xs={6} sm={8} md={6}>
                        <h6>{this.props.title}</h6><hr/>
                        <p>{(this.props.description.length > 50 && this.state.isClicked === false)?(this.props.description.substring(0, 25)):(this.props.description)}
                            <button className='link' onClick={this.onReadMore.bind(this)}>
                                {(this.state.isClicked === false && this.props.description !== null && this.props.description.length > 50)?('...readmore'):('')}
                            </button>
                        </p><hr/>
                        <h6>$: {this.props.price}</h6>
                        <Button onClick={this.handleCart.bind(this)} bsStyle='primary'>Buy Now</Button>
                    </Col>
                </Row>
            </Well>      
        );
    }
}


function mapStateToProps(state){
    return {
        cart: state.cart.cart
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({
       addToCart: addToCart,
       updateCart: updateCart 
    }, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(BookItem);