import React from 'react';
import Blog from '../Blog/Blog';
import {NavLink,Route,Switch} from 'react-router-dom';
import FullPost from '../Blog/FullPost/FullPost';
import CreatePost from '../Blog/CreatePost/CreatePost';
import MyPost from '../Blog/MyPost/MyPost';
import EditPost from '../Blog/EditPost/EditPost';
import UserImage from './UserImage/UserImage';

function Dashboard() {

        return(
            <div className="container custom-container" style={{marginTop:30}}>
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
                        <Route path="/post/edit/:id" component={EditPost}></Route>
                        <Route path="/post/:id" component={FullPost}></Route>
                        <Route path="/dashboard" exact component={Blog}></Route>
                        <Route path="/create-post" component={CreatePost}></Route>
                        <Route path="/my-posts" component={MyPost}></Route>
                 
                    </Switch>
                </div>
            </div>
        );
    
}
export default Dashboard;