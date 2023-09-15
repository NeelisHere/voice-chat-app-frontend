import { useSelector } from 'react-redux'
import { Navigate, /*useLocation*/  } from 'react-router-dom'

const GuestRoute = ({ children }) => {
    // const location = useLocation()
    // const { user, isAuth } = useSelector((state) => state.auth)
    // if(user && isAuth) {
    //     return <Navigate to={'/rooms'}/>
    // } else return children
    return children
}

export default GuestRoute
