import * as actionTypes from '../actions/actionTypes';
let initialState = {
    token:null,
    expireIn:null,
}

function auth(state = initialState,action){
    if(action.type==actionTypes.ADD_TOKEN){
        return{
            ...state,
            token:action.payload.token,
            expireIn:action.payload.expires_in

        }
    }
    return state;
}

export default auth;