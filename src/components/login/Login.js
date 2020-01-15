import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import './Login.css';
import axios from 'axios';
import { validateAll } from 'indicative/validator';
import { Message,Button } from 'semantic-ui-react';

import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'


class Login extends Component{
    constructor(props){
        super(props);
        this.state={
            form:{
                email:'',
                password:'',
            },
            message:{
                type:'',
                text:''
            },
            formSubmit:false,
        };
    }

    handleSubmit = (event)=>{
        event.preventDefault();
        this.setState({formSubmit:true})
        const rules  = {
            email:'required|email',
            password:'required|min:6|max:20',

        };

        const messages = {
            required: (field, validation, args) =>{
                field = field.split('_').join(' ');
                return `${field} is required!`;
            },
            email: (field, validation, args) =>{
                return `${field} is not valid`;
            },
            min: (field, validation, args) =>{
                return `${field} should be more than ${args} characters`;
            },
            max: (field, validation, args) =>{
                return `${field} should be greater than ${args} characters`;
            },
            confirmed:(field, validation, args) =>{
                return `Confirm password should match the password`;
            }
        }

        validateAll(this.state.form,rules,messages)
            .then(()=>{
                this.setState({ errors:{}});
                let data = {...this.state.form};
                axios.post("/auth/login",data)
                .then((res)=>{
                    console.log(res);
                   let form = {...this.state.form}
                   for (let key in form) {
                       if (form.hasOwnProperty(key)) {
                           form[key] = '';
                       }
                   }
                   this.setState({
                       form,
                       formSubmit:false,
                       message:{
                            type:'positive',
                            msg:"Login successfully",
                        }
                    });
                })
               .catch((err)=>{
                   
                    if(err.status != 'undefined'){
                        console.log(err.response)
                        let formattedErrors ={};
                        if(err.response.status && err.response.status == 422){
                            const errors = err.response.data.errors;
                            for(let error of errors){
                                formattedErrors[error.param]=error.msg;
                            }
                        }
                        this.setState({
                            errors:formattedErrors,
                            message:{
                                type:'negtive',
                                msg:err.response.data.message,
                            },
                            formSubmit:false
                        });
                    }else{
                        this.setState({
                            message:{
                                type:'negtive',
                                msg:err.message,
                            },
                            formSubmit:false
                        }); 
                    }
               })
            })
            .catch((err)=>{
    
                const formattedErrors ={};
                err.forEach(error=>formattedErrors[error.field]=error.message)
                this.setState({errors:formattedErrors,formSubmit:false})
            })

    }

    handleInputChange = (e)=>{

        const name = e.target.name;
        const value = e.target.value; 
        const form = {...this.state.form};
        form[name] = value;
        this.setState({
          form
        });
    }

    responseFacebook = (res)=>{
        console.log(res);
    }

    responseGoogle = (res)=>{
        console.log(res);
    }
    
    render(){
        return(
            <div className="card bg-light">
                <article className="card-body mx-auto" style={{maxWidth: 400,marginTop:100,"height":"100vh"}}>
                    <h4 className="card-title mt-3 text-center">Login</h4>
                    {this.state.message.type && this.state.message.type === 'positive' && <Message positive ><Message.Header>Success</Message.Header><p>{this.state.message.msg}</p></Message>}
                    { this.state.message.type && this.state.message.type === 'negtive' && <Message negative ><Message.Header>An error occured</Message.Header><p>{this.state.message.msg}</p></Message> }
                    <p>
                    <FacebookLogin
                        appId="2324656061179668" //APP ID NOT CREATED YET
                        fields="name,email,picture"
                        callback={this.responseFacebook}
                        render={renderProps => (
                            <button onClick={renderProps.onClick} className="btn btn-block btn-facebook"><i className="fa fa-facebook"></i>&nbsp; Login via facebook</button>
                        )}
                    />
                    <GoogleLogin
                        clientId="41860437728-hngcsgpdo10qlkotue8f5do5l9ekr6hl.apps.googleusercontent.com" //CLIENTID NOT CREATED YET
                        buttonText="LOGIN WITH GOOGLE"
                        onSuccess={this.responseGoogle}
                        onFailure={this.responseGoogle}
                        render={renderProps => (
                            <button onClick={renderProps.onClick} className="btn btn-block btn-gmail"><i className="fa fa-google-plus"></i>&nbsp; Login via Gmail</button>
                        )}
                    />
                        
                    </p> 

                    <p className="divider-text">
                        <span className="bg-light">OR</span>
                    </p>
                    <form onSubmit={this.handleSubmit} noValidate>
                        <div className="form-group">
                            <input 
                            name="email" 
                            className="form-control" 
                            placeholder="Email address" 
                            onChange={this.handleInputChange}
                            value={this.state.form.email}
                            type="email" />
                            { this.state.errors && this.state.errors.email && <div className="form-error">{this.state.errors.email}</div> }
                        </div> 

                        <div className="form-group ">
                            <input
                            name="password"
                            className="form-control" 
                            placeholder="Create password" 
                            type="password" 
                            onChange={this.handleInputChange}
                            value={this.state.form.password} />
                            { this.state.errors && this.state.errors.password && <div className="form-error">{this.state.errors.password}</div> }
                        </div> 
                                     
                        <div className="form-group">
                        <Button type="submit" className={this.state.formSubmit ? 'btn btn-primary btn-block loading disabled':'btn btn-primary btn-block' } primary>Login</Button>
                        </div>      
                        <p className="text-center">Have an account? <Link to="/signup">Sign up</Link> </p>
                        <p className="text-center"><Link to="/">Go home</Link> </p>                                                                 
                    </form>
                </article>
            </div>
        );
    }
}
export default Login;