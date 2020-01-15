import React, {Component} from 'react';
import axios from 'axios';
import { validateAll } from 'indicative/validator';
import { Message,Button } from 'semantic-ui-react'
import PostImage from './PostImage/PostImages';

class EditPost extends Component{
    constructor(props){
        super(props);
        this.state = {
            postId:null,
            form:{
                title:'',
                description:'',
                files:[],
                prevFiles :[]
            },
            message:{
                type:'',
                text:''  
            },
            formSubmit:false,
        }
    }

    componentDidMount(){

        axios.get('/post/show/'+this.props.match.params.id)
            .then(res=>{
                let form = {...this.state.form};
                form.title = res.data.title;
                form.description = res.data.description;
                let files=[];
                if(res.data.post_image.length){
                    files = res.data.post_image.map(img=>{
                        return {id:img.id,file:img.file,url:img.fileUrl};
                    })
                }
                form.prevFiles = files;
                this.setState({form,postId:res.data.id});
            })
            .catch(err=>{
                console.log(err);
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
        const rules  = {
            title:'required|max:50',
            description:'required|max:5000',
        };

        const messages = {
            required: (field, validation, args) =>{
                field = field.split('_').join(' ');
                return `${field} is required!`;
            },
            max: (field, validation, args) =>{
                return `${field} should be greater than ${args} characters`;
            },
        }

        validateAll(this.state.form,rules,messages)
            .then(()=>{
                this.setState({ errors:{}});
                let form = {...this.state.form}
                 form['desc'] = form.description;
                 delete form.description;
                axios.put("/post/edit/"+this.state.postId,form)
                .then((res)=>{
                    console.log(res);
                   let form = {...this.state.form};
                   form.title = res.data.title;
                   form.description = res.data.description;
                   form.files=[];
                   let files=[];
                   if(res.data.post_image.length){
                       files = res.data.post_image.map(img=>{
                           return {id:img.id,file:img.file,url:img.fileUrl};
                       })
                   }
                   form.prevFiles = files;
                   this.setState({
                       form,
                       formSubmit:false,
                       message:{
                            type:'positive',
                            msg:"Post Edited successfully",
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

    handleDeleteImage = (id)=>{
        axios.delete(`/post/${this.state.postId}/file/${id}`)
            .then(res=>{
                let form = this.state.form;
                let files = form.prevFiles.filter((file)=>{
                    return file.id !==id;
                })
                form.prevFiles = files;
                this.setState({form});

            })
            .catch(err=>{
                console.log(err)
            })
    }

    render (){
        let prevFiles = this.state.form.prevFiles;
        let preFiles = prevFiles.reduce((rows, key, index) => {
                return (index % 3 == 0 ? rows.push([key]) : rows[rows.length-1].push(key)) && rows;
        }, []);

        let postImages = <p>No images found!</p>;

        if(preFiles.length){

            postImages = preFiles.map((files,index)=>{
               let images = files.map((file,index)=>{
                return (
                        <div key={index} className="col-sm-4">
                            <span onClick={()=>this.handleDeleteImage(file.id)} className="close" >&times;</span>
                            <img className="img-thumbnail" src={file.url} alt="" style={{maxHeight:143}}/>
                        </div>
                    )
               }) 
                return <div key={index} className="row">{images}</div>
            });
            
 
        }

  

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

                <div>
                   {postImages} 
                </div>
            </div>

        );
    }
}

export default EditPost;