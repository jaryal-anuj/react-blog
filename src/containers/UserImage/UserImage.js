import React, { Component } from 'react';
import classes from './UserImage.module.css';
import axios from 'axios';
import { Image } from 'semantic-ui-react';
import DefaultImage from 'assets/images/image.png';

class UserImage extends Component{
    constructor(props){
        super(props);
        this.state={
            user:{}
        }
    }

    handleFileChange=e=>{

        const formData = new FormData();
        formData.append('file',e.target.files[0]);
        axios.post('/user/upload_profile_image',formData)
            .then(res=>{
                let user = {...this.state.user};
                user.profile_image=res.data.imageUrl;
                this.setState({user});
            })
            .catch(err=>{
                console.log(err);
            })
        e.target.value = null;
    }

    componentDidMount(){
        axios.get('/user/profile').then(response =>{
             this.setState({
                 user:response.data,
             })
         })
         .catch(error=>{
             console.log(error)
         })
    }

    render(){

        return(
            <>
                <h2>{this.state.user.name}</h2>
                <h5>Photo of me:</h5>
                <div className={classes.UserImage}>
                    <div className={classes.FakeImage}><Image src={this.state.user.profile_image ? this.state.user.profile_image :DefaultImage} alt="" size='small'/></div>
                    <form>
                        <input type="file" className="form-control" onChange={this.handleFileChange}/>
                    </form>
                </div> 
            </>
        );

    }

}

export default UserImage;