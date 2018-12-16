import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Panel, Modal, Col, Row, Button, ButtonGroup, Label} from 'react-bootstrap';
import {bindActionCreators} from 'redux';
import {deleteCartItem, updateCart, getCart} from '../../actions/cartActions';

class Cart extends Component {

    componentDidMount(){
        this.props.getCart();
    }

    onDelete(id) {
        const currentBookToDelete = this.props.cart;
        const indexToDelete = currentBookToDelete.findIndex(cart => cart.id === id)
        let cartAfterDelete = [...currentBookToDelete.slice(0, indexToDelete), ...currentBookToDelete.slice(indexToDelete + 1)]
        this.props.deleteCartItem(cartAfterDelete);
    }
    onIncrement(id) {
        this.props.updateCart(id, 1, this.props.cart);
    }
    onDecrement(id, quantity) {
        if(quantity > 1) {
            this.props.updateCart(id, -1, this.props.cart);
        }
        
    }

    constructor() {
        super();
        this.state = {
            showModal: false
        }
    }
    open() {
        this.setState({showModal: true})
    }
    close() {
        this.setState({showModal: false})
    }
    render() {
        if(this.props.cart[0]){
            return this.renderCart();
        } else {
            return this.renderEmpty();
        }

    }
    renderEmpty(){
        return(<div></div>)
    }

    renderCart() {
        const cartItemsList = this.props.cart.map(function(cartArr){
            return (
                <Panel className='panelitem' key={cartArr.id}>
                    <Row>
                        <Col xs={12} sm={4}>
                            <h6>{cartArr.title}</h6><span>    </span>
                        </Col>
                        <Col xs={12} sm={2}>
                            <h6>$ {cartArr.price}</h6><span>    </span>
                        </Col>
                        <Col xs={12} sm={2}>
                            <h6>Qty: <Label bsStyle="success">{cartArr.quantity}</Label></h6><span>    </span>
                        </Col>
                        <Col xs={6} sm={4}>
                            <ButtonGroup style={{minWidth: '300px'}}>
                                <Button onClick={this.onDecrement.bind(this, cartArr.id, cartArr.quantity)} bsStyle="default" bsSize="small">-</Button>
                                <Button onClick={this.onIncrement.bind(this, cartArr.id)} bsStyle="default" bsSize="small">+</Button>
                                <span>     </span>
                                <Button onClick={this.onDelete.bind(this, cartArr.id)} bsStyle="danger" bsSize="small">DELETE</Button>
                            </ButtonGroup>
                        </Col>
                    </Row>
                </Panel>
            )
        }, this)
        return(
          <div>
            <Panel bsStyle='primary'>
                <Panel.Heading>Cart</Panel.Heading><br />
                {cartItemsList}
                <hr/>
                <div className="proceedbtn">
                    <h5>Total amount: $ {this.props.totalAmount}</h5>
                    <Button onClick={this.open.bind(this)} bsStyle="success" bsSize="small">
                        PROCEED TO CHECKOUT
                    </Button>
                </div>
                <Modal show={this.state.showModal} onHide={this.close.bind(this)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Thank You!!!</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <h6>Your order has been saved</h6>
                            <p> You will receive an email confirmation</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Col xs={6}>
                            <h6>Total $ {this.props.totalAmount}</h6>
                        </Col>
                    <Button onClick={this.close.bind(this)}>Close</Button>
                    </Modal.Footer>
                 </Modal>
            </Panel>
        </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        cart: state.cart.cart,
        totalAmount: state.cart.totalAmount
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({
        getCart: getCart,
        deleteCartItem: deleteCartItem,
        updateCart: updateCart
    }, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(Cart);