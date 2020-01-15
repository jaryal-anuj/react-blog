import React from 'react';
import { Switch} from 'react-router-dom';
import './App.css';
import Home from './components/home/Home';
import Dashboard from './components/dashboard/Dashboard';
import Login from './components/login/Login';
import Register from './components/register/Register';
import MainLoyout from './components/layout/MainLayout';
import AuthLayout from './components/layout/AuthLayout';
import AppRoute from './components/layout/AppRoute';




function App() {
	return (
		<div className="App">
			<Switch>
				<AppRoute layout={AuthLayout} path="/signin" component={Login}/>
				<AppRoute layout={AuthLayout} path="/signup" component={Register}/>
				<AppRoute layout={MainLoyout} path="/" exact component={Home}/>
				{/* <AppRoute layout={MainLoyout} path="/post/edit/:id" component={Dashboard}/>
				<AppRoute layout={MainLoyout} path="/post/:id" component={Dashboard}/> */}
				<AppRoute layout={MainLoyout} path="/" component={Dashboard}/>
			</Switch>
		</div>
	);
}

export default App;

