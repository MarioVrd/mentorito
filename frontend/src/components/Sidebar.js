import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getUserNotifications } from '../actions/userActions'
import { Button, Sidebar as StyledSidebar } from '../assets/styles'
import { ROLE_STUDENT } from '../constants/roles'
import useApi from '../hooks/useApi'

const Sidebar = ({ children }) => {
    const [isMounted, setIsMounted] = useState(true)

    const dispatch = useDispatch()

    const api = useApi()
    const { status: apiStatus, apiFunction } = api

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const userNotifications = useSelector(state => state.userNotifications)
    const { notifications } = userNotifications

    const markNotificationAsSeenHandler = notificationId => {
        apiFunction('PUT', `/api/users/notifications/${notificationId}`, { notificationId })
    }

    useEffect(() => {
        if (apiStatus === 'completed' && isMounted) dispatch(getUserNotifications())
    }, [apiStatus])

    useEffect(() => {
        dispatch(getUserNotifications())

        return () => {
            setIsMounted(false)
        }
    }, [dispatch])

    return (
        <StyledSidebar>
            <StyledSidebar.Notifications>
                <h3>Moje obavijesti</h3>
                {userInfo?.role === ROLE_STUDENT && notifications?.length > 0 ? (
                    <ul>
                        {notifications.map(n => (
                            <li key={n.notificationId}>
                                <Link to={`/exercises/${n.notification.exerciseId}`}>
                                    {n.notification.text}
                                </Link>
                                <p>{new Date(n.createdAt).toLocaleString()}</p>
                                <Button
                                    danger
                                    small
                                    onClick={() => markNotificationAsSeenHandler(n.notificationId)}
                                >
                                    Označi kao pročitano
                                </Button>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>Nemate nepročitanih obavijesti</p>
                )}
            </StyledSidebar.Notifications>
            {children}
        </StyledSidebar>
    )
}

export default Sidebar
