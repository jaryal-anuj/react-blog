import React, {Component} from 'react';

class CommentForm extends Component{
    render(){
        return(
            
            <form onSubmit={(e)=>this.props.submit(e)} noValidate>
                <div className="form-group">
                    <textarea 
                    className="form-control" 
                    rows="3" 
                    required 
                    value={this.props.comment}
                    onChange={(e)=>this.props.changed(e)}></textarea>
                    { this.props.errors && this.props.errors.comment && <div className="form-error">{this.props.errors.comment}</div> }
                </div>
                <button type="submit" className="btn btn-success">Submit</button>
            </form>
        );
    }
}

export default CommentForm;