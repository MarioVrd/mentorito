import { useSelector } from 'react-redux'
import { Redirect, Route } from 'react-router-dom'
import { ROLE_ADMIN, ROLE_STUDENT, ROLE_TEACHER } from '../constants/roles'

const PrivateRoute = ({ component, children, student, teacher, admin, ...rest }) => {
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    let render = null

    if (
        userInfo &&
        ((!student && !teacher && !admin) ||
            (student && userInfo.role === ROLE_STUDENT) ||
            (teacher && userInfo.role === ROLE_TEACHER) ||
            (admin && userInfo.role === ROLE_ADMIN))
    ) {
        render = component ? (
            <Route component={component} {...rest} />
        ) : (
            <Route {...rest}>{children}</Route>
        )
    } else {
        render = userInfo ? <Redirect push to="/" /> : <Redirect push to="/login" />
    }

    return render
}

export default PrivateRoute
