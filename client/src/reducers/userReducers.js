export function booksReducers(state={users:[]}, action){
    switch(action.type){
        case "POST_USER":
            return {...state, users:[...state.users, ...action.payload]}
            break;
        }
        return state;
    }