import React,{Suspense,lazy} from 'react';
import { Switch,Route} from 'react-router-dom';
import './App.css';
import Home from './components/home/Home';
//import Dashboard from './components/dashboard/Dashboard';
//import Login from './components/login/Login';
//import Register from './components/register/Register';
import MainLoyout from './components/layout/MainLayout';
import AuthLayout from './components/layout/AuthLayout';
import AppRoute from './components/layout/AppRoute';
import { AuthContext } from "./context/auth";

const Dashboard = lazy(()=>import('./components/dashboard/Dashboard'));
const Login = lazy(()=>import('./components/login/Login'));
const Register = lazy(()=>import('./components/register/Register'));




function App() {
	return (
		<div className="App">
				<Suspense fallback={<div>Loading...</div>}>
					<Switch>
						<AppRoute layout={AuthLayout} path="/signin" component={Login}/>
						<AppRoute layout={AuthLayout} path="/signup" component={Register}/>
						<AppRoute layout={MainLoyout} path="/" exact component={Home}/>
						<AppRoute layout={MainLoyout} path="/" component={Dashboard}/>
						<Route render={()=><p>404 Page not found!</p>} />
					</Switch>
				</Suspense>
		</div>
	);
}

export default App;

