import React, { Component } from 'react';
import { BrowserRouter, Route} from 'react-router-dom';
import BooksList from './pages/bookList';
import Register from './pages/Register';
import Signin from './pages/Signin';
import Menu from './menu';
import Footer from './footer';
import BooksForm from './pages/booksForm';
import Cart from './pages/cart';
import {connect} from 'react-redux';

class App extends Component {
    render () {
        return (
            <BrowserRouter>
                <div>
                    <Route exact path="/" component={Register} />
                    <Route exact path="/signin" component={Signin} />
                    <Menu cartItemsNumber= {this.props.totalQty}/>
                    <Route exact path="/booklist" component={BooksList} />
                    <Route exact path="/admin" component={BooksForm} />
                    <Route exact path="/cart" component={Cart} />
                    <Route exact path="/contacts" component={Cart} />
                    <Footer />
                </div>
            </BrowserRouter>
        );
    }
}

function mapStateToProps(state){
    return {
        totalQty: state.cart.totalQty
    }
}

export default connect(mapStateToProps)(App);

