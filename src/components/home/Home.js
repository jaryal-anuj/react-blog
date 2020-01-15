import React, {Component} from 'react';
import Logo from '../../assets/images/logo.svg';

class Home extends Component {
    render(){
        return(
            <div className="container-fluid text-left"> 
                <img src={Logo} alt="" style={{ maxWidth:'100%',maxHeight:'60vmin' }}/>   
            </div>
        );
    }
}

export default Home;