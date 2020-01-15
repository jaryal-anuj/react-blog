import { createContext } from 'react';

console.log(typeof localStorage.getItem('tokens'));
let tokens = JSON.parse(localStorage.getItem('tokens')?localStorage.getItem('tokens'):null) ? JSON.parse(localStorage.getItem('tokens')):{};
console.log('tokens',tokens);
if(Object.entries(tokens).length === 0 && tokens.constructor === Object){
    tokens.isAuth = false;
}else{
    tokens.isAuth = true;
}

export const AuthContext = createContext(tokens);

