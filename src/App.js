import React,{Suspense,lazy} from 'react';
import { Switch,Route} from 'react-router-dom';
import './App.css';
import Home from 'components/home/Home';
const Login = lazy(()=>import('containers/Login/Login'));
const Register = lazy(()=>import('containers/Register/Register'));
const Blog = lazy(()=>import('containers/Blog/Blog'));
const CreatePost = lazy(()=>import('containers/CreatePost/CreatePost'));
const MyPost = lazy(()=>import('containers/MyPost/MyPost'));
const EditPost = lazy(()=>import('containers/EditPost/EditPost'));
const FullPost = lazy(()=>import('containers/FullPost/FullPost'));




function App() {

	return (
		<div className="App">
				<Suspense fallback={<div>Loading...</div>}>
					<Switch>
						<Route path="/signin" component={Login}/>
						<Route path="/signup" component={Register}/>
						<Route path="/blog" component={Blog}/>
						<Route path="/post/edit/:id"  component={EditPost}></Route>
                        <Route path="/post/show/:id"  component={FullPost}></Route>
						<Route path="/create-post" component={CreatePost}></Route>
                        <Route path="/my-posts" component={MyPost}></Route>
						<Route path="/" exact component={Home}/>
						<Route render={()=><p>404 Page not found!</p>} />
					</Switch>
				</Suspense>
		</div>
	);
}

export default App;

