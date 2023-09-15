import './App.css';
import { ChakraProvider } from '@chakra-ui/react'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SemiProtectedRoute from './components/routeProtectors/SemiProtectedRoute.jsx';
import ProtectedRoute from './components/routeProtectors/ProtectedRoute';
import GuestRoute from './components/routeProtectors/GuestRoute';
import Home from './pages/Home';
import Rooms from './pages/Rooms';
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
		element: 
			<GuestRoute>
				<Home />
			</GuestRoute>,
	},
	{
		path: "/get-phone-email",
		element: 
			<GuestRoute>
				<GetPhoneEmail nextURL={'/get-otp'} />
			</GuestRoute>,
	},
	{
		path: "/get-otp",
		element: 
			<GuestRoute>
				<GetOTP nextURL={'/set-username'} />
			</GuestRoute>,
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
				<SetAvatar nextURL={'/rooms'} />
			</SemiProtectedRoute>
	},
	{
		path: "/rooms",
		element: 
			<ProtectedRoute>
				<Rooms />
			</ProtectedRoute>
	}
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
