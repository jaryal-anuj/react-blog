import React, {Component} from 'react';
import { Link} from 'react-router-dom';
import classes from './Post.module.css';
import { Image } from 'semantic-ui-react';
import PostImage from '../../../assets/images/image.png';
import moment from 'moment';


class Post extends Component{

    

    render(){

        return(
            <div className="row shadow" style={{marginBottom:'20px',padding:10,minHeight:200}}>
                <div className="col-sm-4">
                    <div className={classes.FakeImage}>
                        <Image src={this.props.image? this.props.image : PostImage} alt="" size="large"/>
                    </div>
                </div>
                <div className="col-sm-8">
                    <h2><Link to={`/post/show/${this.props.id}`} >{this.props.title}</Link></h2>
                    <h5><span className="fa fa-clock-o"></span> Post by {this.props.user_name}, {moment(this.props.created_at).format('MMMM Do YYYY, h:mm:ss a')}.</h5>
                    <h5><span className="badge badge-danger">Lorem</span></h5><br></br>
                    <p style={{ "whiteSpace":"pre-line" }}>{this.props.body.slice(0,200)}</p>
                </div>
            </div>
        );
    }
}

export default Post;