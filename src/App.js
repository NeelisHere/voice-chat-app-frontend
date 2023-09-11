import './App.css';
import { ChakraProvider } from '@chakra-ui/react'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from './pages/Home';
import Register from './pages/Register';
import Navigation from './components/Navigation';

const router = createBrowserRouter([
	{
	  path: "/",
	  element: <Home />,
	},
	{
		path: "/register",
		element: <Register />,
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
