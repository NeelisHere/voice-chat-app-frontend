import './App.css';
import { ChakraProvider } from '@chakra-ui/react'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from './pages/Home';
import Register from './pages/Register';
// import Navigation from './components/Navigation';
import GetPhoneEmail from './pages/GetPhoneEmail'
import GetOTP from './pages/GetOTP'
import SetActualName from './pages/SetActualName'
import SetAvatar from './pages/SetAvatar'
import SetUsername from './pages/SetUsername'
import Login from './pages/Login'

const router = createBrowserRouter([
	{
	  path: "/",
	  element: <Home />,
	},
	{
		path: "/register",
		element: <Register />,
	},
	{
		path: "/login",
		element: <Login />,
	},
	{
		path: '/get-phone-email',
		element: <GetPhoneEmail/>
	},
	{
		path: '/get-otp',
		element: <GetOTP/>
	},
	{
		path: '/get-actual-name',
		element: <SetActualName/>
	},
	{
		path: '/set-avatar',
		element: <SetAvatar/>
	},
	{
		path: '/set-username',
		element: <SetUsername/>
	},
]);

const App = () => {
	return (
		<ChakraProvider>
			{/* <Navigation /> */}
			<RouterProvider router={router} />
		</ChakraProvider>
	);
}

export default App;
