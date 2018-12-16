import React from 'react';
import ReactDOM from 'react-dom';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware} from 'redux';
import App from './components/App';
import reducers from './reducers/index';
import registerServiceWorker from './registerServiceWorker';
// import { postBooks } from './actions/booksActions';


const store = createStore(reducers, {}, applyMiddleware(thunk,logger));


// store.dispatch(postBooks(
//     [{
//         id: 1,
//         title: 'this is the book title',
//         description: 'this is the book description',
//         price: 33.33
//     },
// {
//     id:2,
//     title: 'Javascript ES6',
//     description: 'this is the book for learning javascript',
//     price: 15
// }]
// ))


ReactDOM.render(
<Provider store = {store}><App /></Provider>, 
document.getElementById('root'));
registerServiceWorker();
