import React,{ Suspense, lazy,useContext} from 'react';
import Blog from '../Blog/Blog';
import {NavLink,Route,Switch} from 'react-router-dom';
//import FullPost from '../Blog/FullPost/FullPost';
//import CreatePost from '../Blog/CreatePost/CreatePost';
//import MyPost from '../Blog/MyPost/MyPost';
//import EditPost from '../Blog/EditPost/EditPost';
import UserImage from './UserImage/UserImage';
import { useAuth,AuthContext } from "../../context/auth";
const CreatePost = lazy(()=>import('../Blog/CreatePost/CreatePost'));
const MyPost = lazy(()=>import('../Blog/MyPost/MyPost'));
const EditPost = lazy(()=>import('../Blog/EditPost/EditPost'));
const FullPost = lazy(()=>import('../Blog/FullPost/FullPost'));


function Dashboard(props) {
  
        return(
            <div className="container custom-container" style={{marginTop:30,marginBottom:30}}>
                <div className="row">
                    <div className="col-sm-4">
                        <UserImage />
                        <ul className="nav nav-pills flex-column">
                        <li className="nav-item">
                                <NavLink to="/dashboard" className="nav-link">All posts</NavLink>
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
                    <Switch>
                        <Suspense fallback={<div>Loading...</div>}>
                            <Route path="/post/edit/:id"  component={EditPost}></Route>
                            <Route path="/post/show/:id"  component={FullPost}></Route>
                            <Route path="/dashboard" exact component={Blog}></Route>
                            <Route path="/create-post" component={CreatePost}></Route>
                            <Route path="/my-posts" component={MyPost}></Route>
                            <Route render={()=><p>404 Page not found!</p>} />
                        </Suspense>
                    </Switch>
                </div>
            </div>
        );
    
}
export default Dashboard;