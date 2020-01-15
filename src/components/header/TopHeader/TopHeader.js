import React, { Component } from 'react';

class TopHeader extends Component {
    render(){
        return(
            <div className="jumbotron text-center" style={ {marginBottom:0,backgroundColor: '#e3f2fd'}}>
                <h1>React App Demo</h1>
            </div>
        );
    }
}
export default TopHeader;