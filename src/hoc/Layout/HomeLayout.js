import React from 'react';
import Footer from 'hoc/Layout/Footer/Footer';
import Header from 'hoc/Layout/Header/Header';


const HomeLoyout = (props)=>{
    return(
        <>
            <Header />
            <div className="container custom-container" style={{marginTop:30,marginBottom:30}}>
                <div className="row">
                    {props.children}
                </div>
            </div> 
            <Footer />
        </>
    );
}

export default HomeLoyout;