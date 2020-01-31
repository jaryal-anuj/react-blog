import React, { Component } from 'react';
import TopHeader from './TopHeader/TopHeader';
import NavHeader from './NavHeader/NavHeader';


class Header extends Component {
    render(){
        return(
            <>
                <TopHeader />
                <NavHeader />
            </>
        );
    }
}
export default Header;
