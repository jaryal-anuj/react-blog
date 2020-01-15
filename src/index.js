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
let access_token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywiaWF0IjoxNTc4OTg0NjgwLCJleHAiOjE1NzkwNzEwODAsImlzcyI6Imh0dHA6Ly9sb2NhbGhvc3Q6MzAwMC9hcGkifQ.HdnPRNa3VkUBOB2EQ0mMGgzR2MtT_Y16OwuDJqBAWEA';
axios.defaults.baseURL = 'http://localhost:3000/api';
axios.defaults.headers.common['Authorization'] = `Bearer ${access_token}` ;

const app = <BrowserRouter><App/></BrowserRouter>;

ReactDOM.render(app, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
