import React from 'react';
import Footer from '../footer/Footer';
import Header from '../header/Header';

const MainLoyout = (props)=>{
    return(
        <>
            <Header />
             {props.children}
            <Footer />
        </>
    );
}

export default MainLoyout;