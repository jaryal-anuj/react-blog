import React, {Component} from 'react';
import axios from 'axios';
import { validateAll } from 'indicative/validator';
import { Message } from 'semantic-ui-react';
import {createPostRules, validationMsg} from '../../../utils/validation/schema';

class CreatePost extends Component{
    constructor(props){
        super(props);
        this.state = {
            form:{
                title:'',
                description:'',
                files:[]
            },
            message:{
                type:'',
                text:''  
            },
            formSubmit:false,
        }
    }

    handleFileChange= (e)=>{
        const formData = new FormData();
        for(let i=0;i<e.target.files.length;i++){
            formData.append('files',e.target.files[i]);
        }

        axios.post('/post/upload_files',formData)
             .then(res=>{
                 let files = [];
                for(let file of res.data.data){
                    files.push(file.filename);
                }
                let form = this.state.form;
                form.files.push(...files);
               // form.files=files;
                this.setState({form,message:{type:'positive',msg:'Files uploaded successfully'}});
             })
             .catch(err=>{
                this.setState({
                    message:{
                        type:'negtive',
                        msg:err.response.data.message,
                    }
                });
             })
        e.target.value = null;

    }

    handleSubmit = e=>{
        e.preventDefault();
        this.setState({formSubmit:true})

        validateAll(this.state.form,createPostRules,validationMsg)
            .then(()=>{
                this.setState({ errors:{}});
                let form = {...this.state.form}
                 form['desc'] = form.description;
                 delete form.description;
                axios.post("/post/create",form)
                .then((res)=>{
                    console.log(res);
                   
                   for (let key in form) {
                       if (form.hasOwnProperty(key)) {
                           if(form[key] instanceof Array ){
                               form[key] = [];
                           }else{
                            if(key == 'desc'){
                                key = 'description';
                            }
                            form[key] = '';
                           }
                       }
                   }
                   this.setState({
                       form,
                       formSubmit:false,
                       message:{
                            type:'positive',
                            msg:"Post created successfully",
                        }
                    });
                })
               .catch((err)=>{
                    let formattedErrors ={};
                    if(err.response.status == 422){
                        const errors = err.response.data.errors;
                        
                        for(let error of errors){
                            if(error.param=='desc'){
                                error.param= 'description';
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
                err.forEach(error=>{
                    formattedErrors[error.field]=error.message
                })
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

    render(){
        return(
            <div className="col-sm-8">
                {this.state.message.type && this.state.message.type === 'positive' && <Message positive ><Message.Header>Success</Message.Header><p>{this.state.message.msg}</p></Message>}
                    { this.state.message.type && this.state.message.type === 'negtive' && <Message negative ><Message.Header>An error occured</Message.Header><p>{this.state.message.msg}</p></Message> }
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="title">Title</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            id="title"
                            name="title"
                            value={this.state.form.title}
                            onChange={this.handleInputChange}
                            placeholder="Enter title" />
                        { this.state.errors && this.state.errors.title && <div className="form-error">{this.state.errors.title}</div> }
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Description</label>
                        <textarea
                            rows="15"
                            className="form-control" 
                            id="description"
                            name="description" 
                            onChange={this.handleInputChange}
                            value={this.state.form.description}
                            placeholder="Enter description">

                        </textarea>
                        { this.state.errors && this.state.errors.description && <div className="form-error">{this.state.errors.description}</div> }
                    </div>
                     <div className="form-group">
                        <label htmlFor="file">Upload file</label>
                        <input type="file" className="form-control" id="file" multiple onChange={this.handleFileChange}/>
                    </div> 
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        );
    }
}

export default CreatePost;