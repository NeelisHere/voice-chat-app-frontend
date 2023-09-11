import { useSelector } from 'react-redux'
// import Error from './Error.jsx'
import { useNavigate } from 'react-router-dom'

const ProtectedRoute = () => {
    const navigate = useNavigate()
    const { isRegistered, isLoggedIn } = useSelector((state) => state.auth)
    // console.log('->', isRegistered)
    if(isLoggedIn && isRegistered) {
        navigate('/rooms')
    } else {
        navigate('/')
    }
}

export default ProtectedRoute
