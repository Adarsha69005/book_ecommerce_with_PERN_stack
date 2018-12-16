import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Grid, Col, Row} from 'react-bootstrap';
import BookItem from './bookItem';
import Slide from './carousel'
import {bindActionCreators} from 'redux';
import {getBooks} from '../../actions/booksActions';
import {getCart} from '../../actions/cartActions';


class BookList extends Component {
    componentDidMount() {
        this.props.getBooks();
        this.props.getCart();
    }
    render() {
        const booksList = this.props.books.map((booksArr) => {
            return (
                <Col xs={12} sm={6} md={4} key={booksArr.id}>
                    <BookItem
                        id={booksArr.id}
                        title={booksArr.title}
                        description={booksArr.description}
                        images={booksArr.images}
                        price={booksArr.price}
                    />
                </Col>
            )
        })
        return(
            <Grid fluid>
                <Row ><Slide /></Row>
                <Row style={{marginTop:'15px'}}>
                    {booksList}
                </Row>
            </Grid>
        )
    }
}

function mapStateToProps(state) {
    return {
        books: state.books.books
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({getBooks, getCart}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(BookList);