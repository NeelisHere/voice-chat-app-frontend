import './App.css';
import { ChakraProvider } from '@chakra-ui/react'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SemiProtectedRoute from './pages/SemiProtectedRoute';
import ProtectedRoute from './pages/ProtectedRoute';
import GuestRoute from './pages/GuestRoute';
import Home from './pages/Home';
import Rooms from './pages/Rooms';
// import Register from './pages/Register';
// import Navigation from './components/Navigation';
// import Login from './pages/Login'
import store from "./store.js";
import { Provider } from "react-redux";
import GetPhoneEmail from './pages/GetPhoneEmail'
import GetOTP from './pages/GetOTP'
import SetActualName from './pages/SetActualName'
import SetAvatar from './pages/SetAvatar'
import SetUsername from './pages/SetUsername'

const router = createBrowserRouter([
	{
	  path: "/",
	  element: <Home />,
	},
	{
		path: "/get-phone-email",
		element: <GetPhoneEmail nextURL={'/get-otp'} />,
	},
	{
		path: "/get-otp",
		element: <GetOTP nextURL={'/set-actual-name'} />,
	},
	{
		path: "/set-actual-name",
		element: 
			<SemiProtectedRoute>
				<SetActualName nextURL={'/set-avatar'} />
			</SemiProtectedRoute>
	},
	{
		path: "/set-avatar",
		element: 
			<SemiProtectedRoute>
				<SetAvatar nextURL={'/set-username'} />
			</SemiProtectedRoute>
	},
	{
		path: "/set-username",
		element: 
			<SemiProtectedRoute>
				<SetUsername nextURL={'/'} />
			</SemiProtectedRoute>
	},
	{
		path: "/set-username",
		element: 
			<ProtectedRoute>
				<Rooms />
			</ProtectedRoute>
	},
	// {
	// 	path: "/register",
	// 	element: <Register />,
	// },
	// {
	// 	path: "/login",
	// 	element: <Login />,
	// },
]);

const App = () => {
	return (
		<ChakraProvider>
			<Provider store={store}>
				{/* <Navigation /> */}
				<RouterProvider router={router} />
			</Provider>
			
		</ChakraProvider>
	);
}

export default App;
