import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Popper from 'popper.js';
import 'font-awesome/css/font-awesome.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'semantic-ui-css/semantic.min.css';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter} from 'react-router-dom';
import axios from 'axios';
import { createStore } from 'redux'
import { Provider } from 'react-redux';
import authReducer from './store/reducers/auth';
const store = createStore(authReducer,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
console.log('my store',store)
let access_token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywiaWF0IjoxNTgwMjkyODIwLCJleHAiOjE1ODAzNzkyMjAsImlzcyI6Imh0dHA6Ly9sb2NhbGhvc3Q6MzAwMS9hcGkifQ.aaktegfs6KR-gW5Ei657jB2_Qa745MTD6mqv6Drs6es';
 axios.defaults.baseURL = 'http://localhost:3001/api';
 axios.defaults.headers.common['Authorization'] = `Bearer ${access_token}` ;

const app = (
    <Provider store={store}>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </Provider>
);

ReactDOM.render(app, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
