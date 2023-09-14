import { useSelector } from 'react-redux'
// import Error from './Error.jsx'
import { useNavigate } from 'react-router-dom'

const SemiProtectedRoute = ({ children }) => {
    const navigate = useNavigate()
    const { isRegistered, isAuth } = useSelector((state) => state.auth)
    // console.log('->', isRegistered)
    if(isRegistered && isAuth) {
        navigate('/rooms')
    } else if(!isRegistered && isAuth) {
        return(<>{ children }</>)
    }
}

export default SemiProtectedRoute
