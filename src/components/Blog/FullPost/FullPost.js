import React, { Component } from 'react';
import axios from 'axios';
import Comment from '../Comment/Comment';

class FullPost extends Component{
    constructor(props){
        super(props);
        console.log(this.props);
        this.state={
            postId : this.props.match.params.id,
            post:{}
        }
    }

    componentDidMount(){
        axios.get('/post/show/'+this.state.postId).then(response =>{
            this.setState({
                post:response.data
            })
        })
        .catch(error=>{
            console.log(error)
        })
    }

    commentAdded=()=>{
        axios.get('/post/show/'+this.state.postId).then(response =>{
            this.setState({
                post:response.data
            })
        })
        .catch(error=>{
            console.log(error)
        })
    }

    render(){
        let post = this.state.post;
        return(
            <div className="col-sm-8">
                <h1>{post.title}</h1>
                <p style={{ "whiteSpace":"pre-line" }}>{post.description}</p>
                <div>
                    <Comment postId={this.state.postId} comments={this.state.post.comments} commentAdded={this.commentAdded}/>
                </div>
            </div>
        );
    }
}

export default FullPost;