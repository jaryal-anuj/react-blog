import React from 'react';
import {NavLink} from 'react-router-dom'
import Footer from 'hoc/Layout/Footer/Footer';
import Header from 'hoc/Layout/Header/Header';
import UserImage from 'containers/UserImage/UserImage';

const MainLoyout = (props)=>{
    return(
        <>
            <Header />
            <div className="container custom-container" style={{marginTop:30,marginBottom:30}}>
                <div className="row">
                    <div className="col-sm-4">
                        <UserImage />
                        <ul className="nav nav-pills flex-column">
                        <li className="nav-item">
                                <NavLink to="/blog" className="nav-link">All posts</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/my-posts" className="nav-link">My posts</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/create-post" className="nav-link">Create Post</NavLink>
                            </li>

                        </ul>
                        <hr className="d-sm-none" />
                    </div>
                    {props.children}
                </div>
            </div> 
            <Footer />
        </>
    );
}

export default MainLoyout;