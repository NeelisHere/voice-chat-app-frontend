import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

const SemiProtectedRoute = ({ children }) => {
    // const navigate = useNavigate()
    const { user, isAuth } = useSelector((state) => state.auth)
    if (isAuth && user && user.activated) {
        return <Navigate to={'/rooms'}/>
    } else if (isAuth && user && !user.activated) {
        return children
    } else {
        return <Navigate to={'/'}/>
    }
    // return children
}

export default SemiProtectedRoute
