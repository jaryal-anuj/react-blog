import React, { Component } from 'react';

class Footer extends Component{
    render(){
        return(
            <div className="jumbotron text-center" style={{ marginBottom:0,backgroundColor: '#e3f2fd'}}>
                <p>Footer</p>
                <p>@copyright react</p>
            </div>
        );
    }
}

export default Footer;