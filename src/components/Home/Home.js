import React, {Component} from 'react';
import Logo from 'assets/images/logo.svg';
import HomeLayout from 'hoc/Layout/HomeLayout';

class Home extends Component {
    render(){
        return(
            <HomeLayout>
                <div className="container-fluid text-left" style={{marginTop:30,marginBottom:30}}> 
                    <img src={Logo} alt="" style={{ maxWidth:'100%',maxHeight:'60vmin' }}/>   
                </div>
            </HomeLayout>
        );
    }
}

export default Home;