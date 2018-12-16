import axios from 'axios';

export function getCart(){
    return (dispatch) => {
        axios.get('/cart')
            .then(response => dispatch({type: "GET_CART", payload: response.data}))
            .catch(err => dispatch({type: "GET_CART_REJECTED", payload:"error getting cart"}))
    }
}

export function addToCart(cart){
    return (dispatch) => {
        axios.post("/cart", cart)
            .then(response => {
                dispatch({type: "ADD_TO_CART", payload:response.data})
            })
            .catch(err => dispatch({type:"ADD_TO_CART_REJECTED", payload:"error when adding to the cart"}))
    }
}

export function deleteCartItem(cart){
    return (dispatch) => {
        axios.post("/cart", cart)
            .then(response => {
                dispatch({type: "DELETE_CART_ITEM", payload:response.data})
            })
            .catch(err => dispatch({type:"DELETE_CART_ITEM_REJECTED", payload:"error when deleting an item in the cart"}))
    }
}

export function updateCart(id, unit, cart){
    const currentBookToUpdate = cart
    const indexToUpdate = currentBookToUpdate.findIndex(book => book.id === id)
    const newBookToUpdate = {
        ...currentBookToUpdate[indexToUpdate],
        quantity: currentBookToUpdate[indexToUpdate].quantity + unit
    }
    let cartUpdate = [...currentBookToUpdate.slice(0, indexToUpdate), newBookToUpdate,
    ...currentBookToUpdate.slice(indexToUpdate + 1)]
    
    return (dispatch) => {
        axios.post("/cart", cartUpdate)
            .then(response => {
                dispatch({type: "UPDATE_CART", payload:response.data})
            })
            .catch(err => dispatch({type:"UPDATE_CART_REJECTED", payload:"error when adding to the cart"}))
    }
   
}