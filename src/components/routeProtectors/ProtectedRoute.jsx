import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

const ProtectedRoute = ({ children }) => {
    const { user, isAuth } = useSelector((state) => state.auth)
    if(user && isAuth) {
        return children
    } else {
        return <Navigate to={'/'}/>
    }
    // return children
}

export default ProtectedRoute
