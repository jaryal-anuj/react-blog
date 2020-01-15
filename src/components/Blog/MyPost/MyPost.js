import React, {Component} from 'react';
import Post from './Post/Post';
import axios from 'axios';
import { Pagination } from 'semantic-ui-react';
import Search from '../Search/Search';

class MyPost extends Component{
    state={
        posts:[],
        post_meta:{},
        search:''
    }
    
    componentDidMount(){
        axios.get('/post/user').then(response =>{
           // console.log(response.data);
            this.setState({
                posts:response.data.data,
                post_meta:response.data.metadata
            })
        })
        .catch(error=>{
            console.log(error)
        })
    }

    handleDeletePost=(id)=>{
        axios.delete('/post/delete/'+id)
             .then(res=>{
                axios.get('/post/user').then(response =>{
                    // console.log(response.data);
                     this.setState({
                         posts:response.data.data,
                         post_meta:response.data.metadata
                     })
                 })
                 .catch(error=>{
                     console.log(error)
                 })
             })
             .catch(err=>{
                 console.log(err);
             })
        
    }

    handlePagination = (e,pageInfo)=>{
        axios.get(`/post/user?page=${pageInfo.activePage}`).then(response =>{
            // console.log(response.data);
             this.setState({
                 posts:response.data.data,
                 post_meta:response.data.metadata
             })
        })
        .catch(error=>{
             console.log(error)
        })
    }

    handleSearchChange=(e)=>{
        this.setState({search:e.target.value})
    }

    handleSearchSubmit=(e)=>{
        e.preventDefault();
        axios.get(`/post?search=${this.state.search}`).then(response =>{
            // console.log(response.data);
             this.setState({
                 posts:response.data.data,
                 post_meta:response.data.metadata
             })
        })
        .catch(error=>{
             console.log(error)
        })
    }

    render(){
        const posts = this.state.posts;
        
       // console.log(posts);
        let renderPost = [];
        if(posts.length) {
            renderPost =posts.map((post,index)=>{

                let file = post.post_image[0] ? post.post_image[0].file: null;
                return <Post id={post.id}  key={index} title={post.title} body={post.description} image={file} clicked={this.handleDeletePost} />
            })
        }
        return(
            <div className="col-sm-8">
                <div className="row mb-5">
                    <Search searchChange={this.handleSearchChange} searchSubmitted={this.handleSearchSubmit} search={this.state.search}/>
                </div>
                {renderPost}
                <div className="pagination" style={{marginBottom:10}}>
                    {renderPost.length && <Pagination style={{margin:'0 auto'}} defaultActivePage={this.state.post_meta.current_page} totalPages={this.state.post_meta.pages} onPageChange={this.handlePagination}/>}
                </div>
            </div>
        )
    }

}

export default MyPost;