import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

const SemiProtectedRoute = ({ children }) => {
    // const navigate = useNavigate()
    // const { user, isAuth } = useSelector((state) => state.auth)
    // if(user && isAuth) {
    //     return <Navigate to={'/rooms'}/>
    // } else if(!user && isAuth) {
    //     return children
    // } else {
    //     return <Navigate to={'/'}/>
    // }
    return children
}

export default SemiProtectedRoute
