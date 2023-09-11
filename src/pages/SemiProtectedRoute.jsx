// import { useSelector } from 'react-redux'
// import Error from './Error.jsx'
// import { useNavigate } from 'react-router-dom'

const SemiProtectedRoute = ({ children }) => {
    // const navigate = useNavigate()
    // const { isRegistered, isLoggedIn } = useSelector((state) => state.auth)
    // console.log('->', isRegistered)
    // if(isRegistered && !isLoggedIn) {
    //     return( <> { children } </> )
    // } else {
    //     navigate('/')
    // }
    return <>{ children }</>
}

export default SemiProtectedRoute
