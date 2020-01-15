import React, {Component} from 'react';
import Logo from '../../assets/images/logo.svg';

class Home extends Component {
    render(){
        return(
            <div className="container-fluid text-left" style={{marginTop:30,marginBottom:30}}> 
                <img src={Logo} alt="" style={{ maxWidth:'100%',maxHeight:'60vmin' }}/>   
            </div>
        );
    }
}

export default Home;