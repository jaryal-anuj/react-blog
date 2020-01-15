import React, { Component } from 'react';
import Post from './Post/Post';
import axios from 'axios';
import { Pagination } from 'semantic-ui-react';
import Search from '../Blog/Search/Search';


class Blog extends Component {

    state={
        posts:[],
        post_meta:{},
        search:''
    }
    
    componentDidMount(){
        axios.get('/post').then(response =>{
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

    handlePagination = (e,pageInfo)=>{
        axios.get(`/post?page=${pageInfo.activePage}`).then(response =>{
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
                console.log(file);
                return <Post  
                            id={post.id}
                            key={index} 
                            title={post.title} 
                            body={post.description}
                            user_name = {post.user.name}
                            created_at = {post.createdAt}
                            image={file} />
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
        );
    }
}

export default Blog;