import axios from 'axios';

export function getBooks(){
    return (dispatch) => {
        axios.get("/books")
            .then((response) => {
                dispatch({type:"GET_BOOKS", payload: response.data})
            })
            .catch(err => dispatch({type:"GET_BOOKS_RECECTED", payload:err}))
    }
}


export function postBooks(book){
    return (dispatch) => {
        axios.post("/books", book)
            .then(response => {
                dispatch({type:"POST_BOOK", payload:response.data})
            })
            .catch(err => dispatch({type:"POST_BOOK_REJECTED", payload:"there was an error while posting a new book"}))
    }
}

export function deleteBooks(id) {
    return (dispatch) => {
        axios.delete("/books/" + id)
            .then((response) => {
                dispatch({type:"DELETE_BOOK", payload:id})
            })
            .catch(err => dispatch({type:"DELETE_BOOK_REJECTED", payload:err}))
    }
}

export function updateBooks(book) {
    return {
        type: "UPDATE_BOOK",
        payload: book
    }
}

//RESET FORM BUTTON
export function resetButton() {
    return {
        type: "RESET_BUTTON"
    }
}