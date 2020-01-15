import React,{Component} from 'react';
import CommentForm from './CommentForm/CommentForm';
import CommentList from './CommentList/CommentList';
import { Message } from 'semantic-ui-react';
import { validateAll } from 'indicative/validator';
import axios from 'axios';

class Comment extends Component{

    constructor(props){
        super(props);
        this.state={
            form:{
                comment:''
            },
            message:{
                type:'',
                text:''
            },
            formSubmit:false,
            
        }
    }

    handleFormSubmit=(e)=>{
        e.preventDefault();
        this.setState({formSubmit:true})
        const rules  = {
            comment:'required|max:300',
        };

        const messages = {
            required: (field, validation, args) =>{
                field = field.split('_').join(' ');
                return `${field} is required!`;
            },
            max: (field, validation, args) =>{
                return `${field} should be greater than ${args} characters`;
            }

        }

        validateAll(this.state.form,rules,messages)
            .then(()=>{
                this.setState({ errors:{}});
                let data = {...this.state.form};
                axios.post(`/post/${this.props.postId}/comment`,data)
                    .then(res=>{
                        this.props.commentAdded();
                        this.setState({
                            form:{
                                comment:''
                            },
                            formSubmit:false,
                            message:{
                                 type:'positive',
                                 msg:"Commented successfully",
                             }
                         });
                    })
                    .catch(err=>{
                        console.log(err);
                        this.setState({
                            form:{
                                comment:''
                            },
                            message:{
                                type:'negtive',
                                msg:err.response.data.message,
                            },
                            formSubmit:false
                        });
                    })
            })
            .catch(err=>{
                const formattedErrors ={};
                err.forEach(error=>formattedErrors[error.field]=error.message)
                this.setState({errors:formattedErrors,formSubmit:false})
            })

    }

    handleInputChange=(e)=>{
        let form = {...this.state.form};
        form.comment = e.target.value;
        this.setState({form});
    }


    render(){

        let commentList = null;
        if(this.props.comments && this.props.comments.length){
            commentList = this.props.comments.map(comment=>{
               return <CommentList key={comment.id} comment={comment}/>
            })
        }
        return(
            <>
                <hr/>
                <h4>Leave a Comment:</h4>
                    {this.state.message.type && this.state.message.type === 'positive' && <Message positive ><Message.Header>Success</Message.Header><p>{this.state.message.msg}</p></Message>}
                    { this.state.message.type && this.state.message.type === 'negtive' && <Message negative ><Message.Header>An error occured</Message.Header><p>{this.state.message.msg}</p></Message> }
                    <CommentForm 
                        submit={this.handleFormSubmit} 
                        changed={this.handleInputChange}
                        errors={this.state.errors}
                        comment={this.state.form.comment}/>
                <br/><br/><br/>
                <p><span className="badge">{this.props.comments && this.props.comments.length}</span> Comments:</p><br/>
                <div className="row">
                    {commentList}
                </div>
            </> 
        )

    }
}

export default Comment;