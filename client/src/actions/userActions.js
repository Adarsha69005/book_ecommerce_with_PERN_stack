import axios from 'axios';


export function postUser(user){
    return (dispatch) => {
        axios.post("/register", user)
            .then(response => {
                dispatch({type:"POST_USER", payload:response.data})
                this.props.history.push('/booklist');
            })
            .catch(err => dispatch({type:"POST_USER_REJECTED", payload:"there was an error while registering user"}))
    }
}