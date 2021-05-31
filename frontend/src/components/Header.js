import { useSelector } from 'react-redux'
import GlobalNews from './GlobalNews'
import { Main } from '../assets/styles'

const Header = () => {
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    return (
        <div>
            <Main.Title>Pozdrav, {userInfo ? `${userInfo.firstName}` : 'Gost'}!</Main.Title>
            <GlobalNews />
        </div>
    )
}

export default Header
