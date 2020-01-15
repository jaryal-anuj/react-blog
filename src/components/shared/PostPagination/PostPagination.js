import React, {Component} from 'react';
import classes from './PostPagination.module.css';
import PostPaginationItem from './PostPaginationItem/PostPaginationItem';

class PostPagination extends Component {

    render(){
        let postItem = [];
        for(let i=1;this.props.post_meta.pages;i++){
            postItem.push(
                <PostPaginationItem key={i}/>
            );
        }
        return(
            <div className={classes.Pagination}>
                <ul className="pagination">
                    <li className="page-item"><a className="page-link" href="#">Previous</a></li>
                    <li className="page-item"><a className="page-link" href="#">1</a></li>
                    <li className="page-item active"><a className="page-link" href="#">2</a></li>
                    <li className="page-item"><a className="page-link" href="#">3</a></li>
                    <li className="page-item"><a className="page-link" href="#">Next</a></li>
                </ul>
            </div>
        )
    }
}

export default PostPagination;