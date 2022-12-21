import {createStore} from 'redux'

const initialState = {
    users: [{id: 1, name: 'daniele', username: 'daniele', psw: 'd', role: 'admin'}],
    loggedInUser: false,
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOGIN':
            return {
                ...state,
                users: action.payload,
                loggedInUser: true
            }   
        case 'LOGOUT':
            return {
                ...state,
                users: initialState.users,
                loggedInUser: false
            }   
        default:
            return state;
    }
}

export default createStore(reducer)