import React, {Component} from 'react';

class CommentList extends Component{
    render(){
        return(
            <>
                <div className="col-sm-2 text-center">
                        <img src={this.props.comment.user.profile_image} className="img-circle" height="65" width="65" alt="Avatar"/>
                </div>
                <div className="col-sm-10">
                    <h4>{this.props.comment.user.name}<small>{this.props.comment.createdAt}</small></h4>
                    <p>{this.props.comment.comment}</p>
                    <br/>
                </div>
            </>
        );
    }
}

export default CommentList;