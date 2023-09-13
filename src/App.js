import './App.css';
import { ChakraProvider } from '@chakra-ui/react'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SemiProtectedRoute from './pages/SemiProtectedRoute';
// import ProtectedRoute from './pages/ProtectedRoute';
// import GuestRoute from './pages/GuestRoute';
import Home from './pages/Home';
// import Rooms from './pages/Rooms';
// import Register from './pages/Register';
// import Navigation from './components/Navigation';
// import Login from './pages/Login'
import store from "./store.js";
import { Provider } from "react-redux";
import GetPhoneEmail from './pages/GetPhoneEmail'
import GetOTP from './pages/GetOTP'
import SetAvatar from './pages/SetAvatar'
import SetUsername from './pages/SetUsername'
import { Toaster } from 'react-hot-toast';

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
		element: <GetOTP nextURL={'/set-username'} />,
	},
	{
		path: "/set-username",
		element: 
			<SemiProtectedRoute>
				<SetUsername nextURL={'/set-avatar'} />
			</SemiProtectedRoute>
	},
	{
		path: "/set-avatar",
		element: 
			<SemiProtectedRoute>
				<SetAvatar nextURL={'/'} />
			</SemiProtectedRoute>
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
				<Toaster />
			</Provider>
			
		</ChakraProvider>
	);
}

export default App;
