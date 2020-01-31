
import * as actionTypes from './actionTypes';

export const addToken =(params) => {
    return {
        type:actionTypes.ADD_TOKEN,
        payload:params
    }
}