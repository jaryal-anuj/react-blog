import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import { validateAll } from 'indicative/validator';
import { Message,Button } from 'semantic-ui-react';

import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import {registerRules, validationMsg} from '../../utils/validation/schema';


class Register extends Component{
    constructor(props){
        super(props);
        this.state = {
            form:{
                name:'',
                email:'',
                password:'',
                password_confirmation:'',
                gmail_id:'',
                fb_id:''
            },
            message:{
                type:'',
                text:''
            },
            formSubmit:false,
        }
    }

    handleSubmit = (event)=>{
        event.preventDefault();
        this.setState({formSubmit:true})

        validateAll(this.state.form,registerRules,validationMsg)
            .then(()=>{
                this.setState({ errors:{}});
                let data = {...this.state.form};
                data['confirm_password'] = data['password_confirmation'];
                delete data['password_confirmation'];
                axios.post("/auth/register",data)
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
                            msg:"Register successfully",
                        }
                    });
                })
               .catch((err)=>{
                    let formattedErrors ={};
                    if(err.response.status == 422){
                        const errors = err.response.data.errors;
                        
                        for(let error of errors){
                            if(error.param == 'confirm_password'){
                                error.param ='password_confirmation';
                            }
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
        if(res.id){
            let form = {...this.state.form};
            form.name = res.name;
            form.email = res.email;
            form.fb_id = res.id;
            this.setState({form,message:{type:'positive', msg:"Enter password to register!"}});
        }
    }

    responseGoogle = (res)=>{
        if(res.profileObj){
            let form = {...this.state.form};
            form.name = res.profileObj.name;
            form.email = res.profileObj.email;
            form.gmail_id = res.profileObj.googleId;
            this.setState({form,message:{type:'positive', msg:"Enter password to register!"}});
        }
    }

    render(){
        return(
            <div className="card bg-light">
                <article className="card-body mx-auto" style={{maxWidth: 400,marginTop:100,"height":"100vh"}}>
                    <h4 className="card-title mt-3 text-center">Create Account</h4>
                    <p className="text-center">Get started with your free account</p>
                    {this.state.message.type && this.state.message.type === 'positive' && <Message positive ><Message.Header>Success</Message.Header><p>{this.state.message.msg}</p></Message>}
                    { this.state.message.type && this.state.message.type === 'negtive' && <Message negative ><Message.Header>An error occured</Message.Header><p>{this.state.message.msg}</p></Message> }
                    <p>
                    <FacebookLogin
                        appId="2324656061179668" //APP ID NOT CREATED YET
                        fields="name,email,picture"
                        callback={this.responseFacebook}
                        render={renderProps => (
                            <button onClick={renderProps.onClick} className="btn btn-block btn-facebook"><i className="fa fa-facebook"></i>&nbsp; Register via facebook</button>
                        )}
                    />
                    { this.state.errors && this.state.errors.fb_id && <div className="form-error">{this.state.errors.fb_id}</div> }
                    <GoogleLogin
                        clientId="41860437728-hngcsgpdo10qlkotue8f5do5l9ekr6hl.apps.googleusercontent.com" //CLIENTID NOT CREATED YET
                        buttonText="LOGIN WITH GOOGLE"
                        onSuccess={this.responseGoogle}
                        onFailure={this.responseGoogle}
                        render={renderProps => (
                            <button onClick={renderProps.onClick} className="btn btn-block btn-gmail"><i className="fa fa-google-plus"></i>&nbsp; Register via Gmail</button>
                        )}
                    />
                    { this.state.errors && this.state.errors.gmail_id && <div className="form-error">{this.state.errors.gmail_id}</div> }
                    </p> 
                    <p className="divider-text">
                        <span className="bg-light">OR</span>
                    </p>
                    
                    <form onSubmit={this.handleSubmit} noValidate>
                        <div className="form-group">
                            <input 
                                name="name" 
                                className="form-control" 
                                placeholder="Full name" 
                                type="text"
                                onChange={this.handleInputChange}
                                value={this.state.form.name}/>
                            { this.state.errors && this.state.errors.name && <div className="form-error">{this.state.errors.name}</div> }
                        </div> 
                        

                        <div className="form-group">
                            <input 
                                name="email" 
                                className="form-control" 
                                placeholder="Email address" 
                                type="email"
                                onChange={this.handleInputChange}
                                value={this.state.form.email} />
                            { this.state.errors && this.state.errors.email && <div className="form-error">{this.state.errors.email}</div> }
                        </div> 

                        <div className="form-group">
                            <input 
                                name="password" 
                                className="form-control" 
                                placeholder="Create password" 
                                type="password"
                                onChange={this.handleInputChange}
                                value={this.state.form.password}/>
                            { this.state.errors && this.state.errors.password && <div className="form-error">{this.state.errors.password}</div> }
                        </div> 
                        <div className="form-group">
                            <input 
                                name="password_confirmation" 
                                className="form-control" 
                                placeholder="Repeat password" 
                                type="password"
                                onChange={this.handleInputChange}
                                value={this.state.form.password_confirmation}/>
                            { this.state.errors && this.state.errors.password_confirmation && <div className="form-error">{this.state.errors.password_confirmation}</div> }
                        </div>                                       
                        <div className="form-group">
                            <Button type="submit" className={this.state.formSubmit ? 'btn btn-primary btn-block loading disabled':'btn btn-primary btn-block' } primary>Create Account</Button>
                        </div>      
                        <p className="text-center">Have an account? <Link to="/signin">Log In</Link> </p>
                        <p className="text-center"><Link to="/">Go home</Link> </p>                                                                  
                    </form>
                </article>
            </div>
        );
    }
}
export default Register;